import App from 'core/app';
import { Request, Response } from 'express';

interface IRouteSource {
    req: Request;
    res: Response;
    next: CallableFunction;
    app?: App;
}

export { IRouteSource };
