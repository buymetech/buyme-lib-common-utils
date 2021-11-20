import {config} from "../env";
import {ApiError, ApiResponse, Client} from "@elastic/elasticsearch";
import {TransportRequestCallback} from "@elastic/elasticsearch/lib/Transport";

export default class Logger {
    readonly client: Client;

    constructor() {
        this.client = new Client({
            node: config.elastic.endpoint,
            auth: {
                apiKey: config.elastic.apikey
            }
        })
    }

    ping(): TransportRequestCallback {
        return this.client.ping({}, {}, (err: ApiError, result: ApiResponse) => {
            console.log(err ?? result);
        });
    }
}