import { config } from '../../config.js';
import { ApiResponse, Client } from '@elastic/elasticsearch';
import { TransportRequestPromise } from '@elastic/elasticsearch/lib/Transport';

interface EsObject {
  [key: string]: any;
}

export default class ElasticClient {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      cloud: {
        id: config.elastic.cloud_id ?? '',
      },
      auth: {
        username: config.elastic.username ?? '',
        password: config.elastic.password ?? '',
      },
    });
  }

  send(
    logObject: EsObject,
    idx = config.elastic.index,
  ): TransportRequestPromise<ApiResponse> {
    const dt = new Date();

    return this.client.index({
      index: 'es_index' in logObject ? logObject.es_index : idx,
      refresh: true,
      body: {
        '@timestamp': dt.toISOString(),
        service: config.service_name,
        ...logObject,
      },
    });
  }
}
