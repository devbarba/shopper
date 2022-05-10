import App from 'core/app';
import { Request, Response } from 'express';

interface IRouteSource {
    req: Request;
    res: Response;
    app: App;
    next: CallableFunction;
}

export { IRouteSource };
