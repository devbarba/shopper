interface IConfig {
    env: 'development' | 'stage' | 'production';
    timezone: string;
    host: {
        ip: string;
        port: number;
    };
    jwt: {
        secret: string;
        ttl: string;
    };
    [key: string]: any;
}

export default IConfig;
