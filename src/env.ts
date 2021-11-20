import * as dotenv from "dotenv";

dotenv.config();

export const config = {
    elastic: {
        endpoint: process.env.ELASTIC_NODE,
        apikey: process.env.ELASTIC_NODE
    },
}