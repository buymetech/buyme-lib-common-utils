import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
    env: process.env.NODE_ENV,
    service: process.env.SERVICE,
    log_level: process.env.LOGGING_LEVEL,
    elastic: {
        username: process.env.ELASTIC_USERNANME,
        password: process.env.ELASTIC_PASSWORD,
        cloud_id: process.env.ELASTIC_CLOUD_ID,
        index: process.env.ELASTIC_INDEX,
    },
};
//# sourceMappingURL=config.js.map