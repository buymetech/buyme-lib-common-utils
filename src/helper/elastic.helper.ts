import {config} from "../env";
import {ApiResponse, Client} from "@elastic/elasticsearch";
import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";

export class Elastic {
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

    send(): TransportRequestPromise<ApiResponse> {
        return this.client.index({
            index: config.elastic.index,
            refresh: true,
            body: {
                service: config.service,
            }
        })
    }
}