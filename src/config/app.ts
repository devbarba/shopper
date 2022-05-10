import { getEnv } from 'utils/env';

export default {
    app: {
        env: getEnv('NODE_ENV', 'development'),
        timezone: getEnv('TZ', 'Europe/Rome'),
        host: {
            ip: getEnv('APP_HOST', '0.0.0.0'),
            port: getEnv('APP_PORT', 9004),
        },
        jwt: {
            secret: getEnv('JWT_SECRET', ''),
            ttl: getEnv('JWT_TTL', ''),
        },
    },
};
