import Handler from 'core/handler';
import express, { Express } from 'express';
import App from 'core/app';
import Http from 'core/http/middlewares/http';
import routes from 'routes/index';
import http from 'http';

interface IServer {
    start: (afterStart?: () => unknown) => http.Server;
}

class Server implements IServer {
    protected app: App;

    protected express: Express;

    /**
     * @param app App
     */
    constructor(app: App) {
        this.app = app;
        this.express = express();
    }

    /**
     * Instantiate a new Server class.
     * @param app App
     * @returns new Server()
     */
    static init(app: App): Server {
        return new this(app);
    }

    /**
     * Register middleware`s, routes and error handling.
     */
    register(): void {
        // global http middleware`s
        Http.init(this.express).mount();

        // routes
        // To-Do (Auto load routes)
        this.express.use('/', routes);

        // error handling
        this.express.use((error, req, res, next) => {
            const isErrorHandler = error instanceof Handler;

            return res.status(isErrorHandler ? error.getStatusCode() : 500).json({
                message: isErrorHandler ? error.getMessage() : error.message,
                errors: isErrorHandler ? error.getErrors() : [],
            });
        });
    }

    /**
     * Listen on server configuration and run any callback if exists.
     * @param afterStart afterStart () => unknown
     */
    start(afterStart?: () => unknown): http.Server {
        const port = this.app.config('app.host.port', 9004);
        const server = this.app.config('app.host.ip', '0.0.0.0');
        const environment = this.app.config('app.env', 'development');

        this.register();
        return this.express.listen(Number(port), String(server), () => {
            console.log(`[${environment}] - Server running @ http://${server}:${port}`);
            if (afterStart) afterStart();
        });
    }
}

export default Server;
