import { getEnv } from 'utils/env';

export default {
    app: {
        env: getEnv('NODE_ENV', 'development'),
        timezone: getEnv('TZ', 'Europe/Rome'),
        host: {
            ip: getEnv('HOST', '0.0.0.0'),
            port: getEnv('PORT', 9004),
        },
        jwt: {
            secret: getEnv('JWT_SECRET', ''),
            ttl: getEnv('JWT_TTL', ''),
        },
    },
};
