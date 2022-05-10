import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import { Application } from 'express';

class Http {
    protected express: Application;

    /**
     * @param express
     */
    constructor(express: Application) {
        this.express = express;
    }

    /**
     * @param express
     * @returns new Application
     */
    static init(express: Application) {
        return new this(express);
    }

    /**
     * Mount Http Middleware`s
     * @returns Application
     */
    mount(): Application {
        this.express.use(cors());
        this.express.disable('x-powered-by');
        this.express.use(compress());
        this.express.use(bodyParser.json({ limit: '10mb' }));
        this.express.use(
            bodyParser.urlencoded({
                extended: false,
            }),
        );

        return this.express;
    }
}

export default Http;
