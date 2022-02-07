import { config } from '../../config.js';
import { ApiResponse, Client } from '@elastic/elasticsearch';
import { TransportRequestPromise } from '@elastic/elasticsearch/lib/Transport';

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

  send(info: Object): TransportRequestPromise<ApiResponse> {
    const dt = new Date();
    return this.client.index({
      index: config.elastic.index ?? '',
      refresh: true,
      body: {
        '@timestamp': dt.toISOString(),
        service: config.service_name,
        ...info,
      },
    });
  }
}
