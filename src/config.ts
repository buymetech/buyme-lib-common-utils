import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV,
  service: process.env.SERVICE,
  log_level: process.env.LOGGING_LEVEL,
  elastic: {
    username: process.env.ES_USERNAME,
    password: process.env.ES_PASSWORD,
    cloud_id: process.env.ES_CLOUD_ID,
    index: process.env.ES_INDEX,
  },
};
