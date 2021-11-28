import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    elastic: {
        username: process.env.ELASTIC_USERNANME,
        password: process.env.ELASTIC_PASSWORD,
        cloud_id: process.env.ELASTIC_CLOUD_ID,
        service: process.env.SERVICE_NAME,
    },
}