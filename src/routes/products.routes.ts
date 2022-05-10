import ProductsController from 'app/controllers/products.controller';
import App from 'core/app';
import {
    Router, Request, Response, NextFunction,
} from 'express';

const productsController = new ProductsController();
const productsRouter = Router();

productsRouter.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => productsController.list({
        req, res, next, app: new App(),
    }),
);

export default productsRouter;
