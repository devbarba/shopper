import { IRouteSource } from 'interfaces/route';
import BasketModel, { IModelBasket } from 'app/models/Basket';
import {
    OK, NOT_FOUND, CONFLICT, NO_CONTENT, CREATED, ACCEPTED, NOT_ACCEPTABLE,
} from 'http-status';
import Joi from 'joi';
import Handler from 'core/handler';
import { verifyFields } from 'utils/validate';
import ProductModel from 'app/models/Product';
import { Age } from 'interfaces/basket';
import { Response } from 'express';

interface IBasketController {
    retrieve: ({ req, res, next }: IRouteSource) => Promise<Response<IModelBasket>>;
    create: ({ req, res, next }: IRouteSource) => Promise<IModelBasket>;
    update: ({ req, res, next }: IRouteSource) => Promise<Response<IModelBasket>>;
    destroy: ({ req, res, next }: IRouteSource) => Promise<unknown>;
}

class BasketController implements IBasketController {
    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async retrieve({
        req, res, next,
    }: IRouteSource): Promise<Response<IModelBasket>> {
        try {
            const { id: basketId } = req.params;

            const basket = await BasketModel.findById(basketId).select('-age -__v');

            if (!basket) {
                throw new Handler(
                    `basket with id ${basketId} not found.`,
                    NOT_FOUND,
                );
            }

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < basket.items.length; i++) {
                // @ts-ignore
                basket.items[i].product = await ProductModel.findOne({ sku: basket.items[i].sku }).select('-_id -__v -createdAt -updatedAt');
                // @ts-ignore
                delete basket.items[i].sku;
            }

            return res.status(OK).json(basket);
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
    }: IRouteSource): Promise<any> {
        try {
            verifyFields(
                req.body,
                Joi.object({
                    items: Joi.array().items(Joi.object({
                        sku: Joi.string().regex(/^[a-zA-Z0-9-_]+$/).required(),
                        quantity: Joi.number().required(),
                    }).required()).required(),
                    delivery: Joi.object({
                        zip_code: Joi.string().regex(/^[a-zA-Z0-9-]+$/).required(),
                    }).required(),
                    coupon: Joi.string(),
                }),
            );

            const {
                items, delivery, coupon,
            } = req.body;

            // To-Do - Basket removing by age, maybe use Redis for scheduling Jobs.
            // To-Do - Discount coupons, already being passed on api
            // but will be good to implement at DB level too and discount at the price.

            const skus: string[] = items.map((item: { sku: string, quantity: number }) => item.sku);
            let productPrices: number = 0;

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < skus.length; i++) {
                // Improve it iteration at all.
                const product = await ProductModel.findOne({ sku: skus[i] }).select('-__v');

                if (!product) {
                    throw new Handler(
                        `product with SKU:${skus[i]} not exists.`,
                        CONFLICT,
                    );
                }

                if (product.stockLevel < items[i].quantity) {
                    throw new Handler(
                        `we don't have ${items[i].quantity} of product with SKU:${skus[i]} in stock.`,
                        NOT_ACCEPTABLE,
                    );
                }

                items[i].name = product.name;
                items[i].price = product.price;
                items[i].size = product.size;
                items[i].stockLevel = product.stockLevel;
                productPrices += product.price;
            }

            const createdBasket = await BasketModel.create({
                items: items.map((item) => ({ sku: item.sku, quantity: item.quantity })), zip_code: delivery.zip_code, age: Age.twentyFour, coupon, cost: productPrices,
            });

            return res.status(CREATED).json({
                // eslint-disable-next-line no-underscore-dangle
                _id: createdBasket?._id, items, delivery, coupon, cost: productPrices,
            });
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
    }: IRouteSource): Promise<Response<IModelBasket>> {
        try {
            verifyFields(
                req.body,
                Joi.object({
                    items: Joi.array().items(Joi.object({
                        sku: Joi.string().regex(/^[a-zA-Z0-9-_]+$/).required(),
                        quantity: Joi.number().required(),
                    }).required()).required(),
                    delivery: Joi.object({
                        zip_code: Joi.string().regex(/^[a-zA-Z0-9-]+$/).required(),
                    }).required(),
                    coupon: Joi.string(),
                }),
            );

            const { id: basketId } = req.params;
            const {
                items, delivery, coupon,
            } = req.body;

            const skus: string[] = items.map((item: { sku: string, quantity: number }) => item.sku);
            let productPrices: number = 0;

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < skus.length; i++) {
                // Improve it iteration at all.
                const product = await ProductModel.findOne({ sku: skus[i] }).select('-__v');

                if (!product) {
                    throw new Handler(
                        `product with SKU:${skus[i]} not exists.`,
                        CONFLICT,
                    );
                }

                if (product.stockLevel < items[i].quantity) {
                    throw new Handler(
                        `we don't have ${items[i].quantity} of product with SKU:${skus[i]} in stock.`,
                        NOT_ACCEPTABLE,
                    );
                }

                items[i].name = product.name;
                items[i].price = product.price;
                items[i].size = product.size;
                items[i].stockLevel = product.stockLevel;
                productPrices += product.price;
            }

            await BasketModel.updateOne({ _id: basketId }, {
                items: items.map((item) => ({ sku: item.sku, quantity: item.quantity })), zip_code: delivery.zip_code, age: Age.twentyFour, coupon, cost: productPrices,
            });

            return res.status(ACCEPTED).json({
                _id: basketId, items, delivery, coupon, cost: productPrices,
            });
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
            const { id: basketId } = req.params;

            const basket = await BasketModel.findById(basketId);

            if (!basket) {
                throw new Handler(
                    `basket with id ${basketId} not found.`,
                    NOT_FOUND,
                );
            }

            await basket.delete();

            return res.status(NO_CONTENT).json();
        } catch (error) {
            return next(error);
        }
    }
}

export default BasketController;
