import { getProjectDir } from 'utils/dir';
import { autoLoadEnvironmentVariables } from 'utils/env';
import _ from 'lodash';

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
     * Start express listening;
     * @param server Express.listen()
     */
    start(server: () => void): void {
        server();
    }
}

export default App;
