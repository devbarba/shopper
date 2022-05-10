import { getProjectDir } from 'utils/dir';
import { autoLoadEnvironmentVariables } from 'utils/env';
import _ from 'lodash';
import mongoose from 'mongoose';

interface IApp {
    start(server: () => void): void
}

class App implements IApp {
    protected configs: any;

    constructor() {
        this.configs = autoLoadEnvironmentVariables(getProjectDir());
    }

    /**
     * Retrieve config by key from environments loaded in the system.
     * @param key string
     * @param alternate string
     * @returns string
     */
    config(key: string, alternate?: any): any {
        return _.get(this.configs, key, alternate);
    }

    /**
     * MongoDB connection
     */
    databaseConnection() {
        const {
            user, password, host, port, database,
        } = this.config('database.database');

        mongoose
            .connect(`mongodb://${user}:${password}@${host}:${port}/${database}`, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .catch(() => process.exit(1));
    }

    /**
     * Register all things that the application needs.
     */
    async register(): Promise<void> {
        this.databaseConnection();
    }

    /**
     * Start express listening;
     * @param server Express.listen()
     * @returns Promise<void>
     */
    async start(server: () => void): Promise<void> {
        await this.register().finally(() => server());
    }
}

export default App;
