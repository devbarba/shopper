import { Router, Response, Request } from 'express';
import productsRouter from 'routes/products.routes';

import { OK } from 'http-status';

const routes = Router();

routes.get('/', (req: Request, res: Response) => res.status(OK).json({ timestamp: Date.now().toString() }));

routes.use('/products', productsRouter);

export default routes;
