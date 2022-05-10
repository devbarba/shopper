import { IRouteSource } from 'interfaces/route';
import ProductModel from 'app/models/Product';
import { OK, NOT_FOUND } from 'http-status';

interface IProductsController {
    list: ({ res }: IRouteSource) => Promise<any>;
    retrieve: ({ req, res, app }: IRouteSource) => Promise<any>;
}

class ProductsController implements IProductsController {
    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async list({
        res,
    }: IRouteSource): Promise<any> {
        const products = await ProductModel.find();

        if (!products.length) res.status(NOT_FOUND).json({ message: 'products not found.' });

        return res.status(OK).json({ products });
    }

    /**
     * @param IRouteSource
     * @returns Promise<any>
     */
    async retrieve({
        req, res,
    }: IRouteSource): Promise<any> {
        const { sku: productSku } = req.params;

        const product = await ProductModel.findOne({ sku: productSku });

        if (!product) res.status(NOT_FOUND).json({ message: `product ${productSku} not found.` });

        return res.status(OK).json({ product });
    }
}

export default ProductsController;
