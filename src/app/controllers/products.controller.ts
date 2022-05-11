import { IRouteSource } from 'interfaces/route';
import ProductModel, { IModelProduct } from 'app/models/Product';
import {
    OK, NOT_FOUND, CONFLICT, NO_CONTENT, CREATED, ACCEPTED,
} from 'http-status';
import Joi from 'joi';
import { Sizes } from 'interfaces/product';
import Handler from 'core/handler';
import { verifyFields } from 'utils/validate';
import { Response } from 'express';

interface IProductsController {
    list: ({ req, res, next }: IRouteSource) => Promise<Response<IModelProduct[]>>;
    retrieve: ({ req, res, next }: IRouteSource) => Promise<Response<IModelProduct>>;
    create: ({ req, res, next }: IRouteSource) => Promise<Response<IModelProduct>>;
    update: ({ req, res, next }: IRouteSource) => Promise<Response<IModelProduct>>;
    destroy: ({ req, res, next }: IRouteSource) => Promise<unknown>;
}

class ProductsController implements IProductsController {
    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async list({
        res, next,
    }: IRouteSource): Promise<Response<IModelProduct[]>> {
        try {
            const products = await ProductModel.find().select('-_id -__v');

            if (!products.length) {
                throw new Handler(
                    'products not found.',
                    NOT_FOUND,
                );
            }

            return res.status(OK).json({ items: products });
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async retrieve({
        req, res, next,
    }: IRouteSource): Promise<Response<IModelProduct>> {
        try {
            const { sku: productSku } = req.params;

            const product = await ProductModel.findOne({ sku: productSku }).select('-_id -__v');

            if (!product) {
                throw new Handler(
                    `product ${productSku} not found.`,
                    NOT_FOUND,
                );
            }

            return res.status(OK).json(product);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async create({
        req, res, next,
    }: IRouteSource): Promise<Response<IModelProduct>> {
        try {
            verifyFields(
                req.body,
                Joi.object({
                    sku: Joi.string().regex(/^[a-zA-Z0-9-_]+$/).required(),
                    name: Joi.string().required(),
                    size: Joi.valid(Sizes.L, Sizes.M, Sizes.S, Sizes.XL, Sizes.XXL),
                    price: Joi.number().required(),
                    stockLevel: Joi.number().required(),
                }),
            );

            const {
                sku, name, size, price, stockLevel,
            } = req.body;

            const product = await ProductModel.findOne({ sku }).select('-__v');

            if (product) {
                throw new Handler(
                    `product with SKU:${sku} already exists.`,
                    CONFLICT,
                );
            }

            const newProduct = await ProductModel.create({
                sku, name, size, price, stockLevel,
            });

            return res.status(CREATED).json(newProduct);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async update({
        req, res, next,
    }: IRouteSource): Promise<Response<IModelProduct>> {
        try {
            verifyFields(
                req.body,
                Joi.object({
                    sku: Joi.string().regex(/^[a-zA-Z0-9-_]+$/).required(),
                    name: Joi.string().required(),
                    size: Joi.valid(Sizes.L, Sizes.M, Sizes.S, Sizes.XL, Sizes.XXL),
                    price: Joi.number().required(),
                    stockLevel: Joi.number().required(),
                }),
            );

            const {
                sku, name, size, price, stockLevel,
            } = req.body;

            const { sku: skuParam } = req.params;

            const product = await ProductModel.findOneAndUpdate({ sku: skuParam }, {
                sku, name, size, price, stockLevel,
            }, { new: true }).select('-_id -__v');

            if (!product) {
                throw new Handler(
                    `product with SKU:${skuParam} not exists.`,
                    NOT_FOUND,
                );
            }

            return res.status(ACCEPTED).json(product);
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async destroy({
        req, res, next,
    }: IRouteSource): Promise<unknown> {
        try {
            const { sku: productSku } = req.params;

            const product = await ProductModel.findOne({ sku: productSku });

            if (!product) {
                throw new Handler(
                    `product ${productSku} not found.`,
                    NOT_FOUND,
                );
            }

            await product.delete();

            return res.status(NO_CONTENT).json();
        } catch (error) {
            return next(error);
        }
    }
}

export default ProductsController;
