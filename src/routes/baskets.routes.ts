import BasketController from 'app/controllers/basket.controller';
import App from 'core/app';
import {
    Router, Request, Response, NextFunction,
} from 'express';

const basketController = new BasketController();
const basketRouter = Router();

basketRouter.post(
    '/',
    (req: Request, res: Response, next: NextFunction) => basketController.create({
        req, res, next, app: new App(),
    }),
);

export default basketRouter;
