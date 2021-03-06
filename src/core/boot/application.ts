import App from 'core/app';

let instance: App | null = null;

function Application(): App {
    if (!instance) instance = new App();

    return instance;
}

export default Application();
