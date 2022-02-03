import { ApiResponse } from '@elastic/elasticsearch';
import { TransportRequestPromise } from '@elastic/elasticsearch/lib/Transport';
export default class ElasticClient {
    private readonly client;
    constructor();
    send(info: Object): TransportRequestPromise<ApiResponse>;
}
