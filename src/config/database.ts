import { getEnv } from 'utils/env';

export default {
    database: {
        user: getEnv('MONGO_USER', ''),
        password: getEnv('MONGO_PASS', ''),
        database: getEnv('MONGO_DB_NAME', ''),
        host: getEnv('MONGO_HOST', ''),
        port: getEnv('MONGO_PORT', ''),
    },
};
