import BasketController from 'app/controllers/basket.controller';
import App from 'core/app';
import {
    Router, Request, Response, NextFunction,
} from 'express';

const basketController = new BasketController();
const basketRouter = Router();

basketRouter.get(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => basketController.retrieve({
        req, res, next, app: new App(),
    }),
);

basketRouter.post(
    '/',
    (req: Request, res: Response, next: NextFunction) => basketController.create({
        req, res, next, app: new App(),
    }),
);

basketRouter.put(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => basketController.update({
        req, res, next, app: new App(),
    }),
);

basketRouter.delete(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => basketController.destroy({
        req, res, next, app: new App(),
    }),
);

export default basketRouter;
