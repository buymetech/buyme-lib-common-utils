import { ApiResponse } from '@elastic/elasticsearch';
import { TransportRequestPromise } from '@elastic/elasticsearch/lib/Transport';
interface EsObject {
    [key: string]: any;
}
export default class ElasticClient {
    private readonly client;
    constructor();
    send(logObject: EsObject, idx?: string): TransportRequestPromise<ApiResponse>;
}
export {};
