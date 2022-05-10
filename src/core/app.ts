import { getProjectDir } from 'utils/dir';
import { autoLoadEnvironmentVariables } from 'utils/env';

interface IApp {
    start(server: () => void): void
}

class App implements IApp {
    protected configs: any;

    constructor() {
        this.configs = autoLoadEnvironmentVariables(getProjectDir());
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
