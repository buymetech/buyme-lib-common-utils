import {config} from "../env.js";
import {ApiResponse, Client} from "@elastic/elasticsearch";
import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";

export class Logger {
    readonly client: Client;

    constructor() {
        this.client = new Client({
            cloud: {
                id: config.elastic.cloud_id,
            },
            auth: {
                username: config.elastic.username,
                password: config.elastic.password
            }
        });
    }

    run(): TransportRequestPromise<ApiResponse> {
        return this.client.index({
            index: 'test-index',
            refresh: true,
            body: {
                service: config.elastic.service,
            }
        })
    }
}