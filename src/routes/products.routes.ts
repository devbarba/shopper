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

productsRouter.get(
    '/:sku',
    (req: Request, res: Response, next: NextFunction) => productsController.retrieve({
        req, res, next, app: new App(),
    }),
);

productsRouter.post(
    '/',
    (req: Request, res: Response, next: NextFunction) => productsController.create({
        req, res, next, app: new App(),
    }),
);

productsRouter.put(
    '/:sku',
    (req: Request, res: Response, next: NextFunction) => productsController.update({
        req, res, next, app: new App(),
    }),
);

productsRouter.delete(
    '/:sku',
    (req: Request, res: Response, next: NextFunction) => productsController.destroy({
        req, res, next, app: new App(),
    }),
);

export default productsRouter;
