import Transport, * as transportHelper from 'winston-transport';
import ecsFormat from '@elastic/ecs-winston-format';
import ElasticClient from './elastic.client.js';
import { CommonHelper } from '../../helpers/common.helper';

export class ElasticTransport extends Transport {
  private opts: transportHelper.TransportStreamOptions | undefined;

  constructor(opts?: transportHelper.TransportStreamOptions) {
    super(opts);

    this.opts = opts || {};
    this.opts.format = ecsFormat();
  }

  log(data: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', data);
    });

    const logObject = this.getLogObject(data);
    const client = new ElasticClient();

    client.send(logObject).catch((error) => {
      console.error('Error while sending log to ES', error);
    });

    callback();
  }

  getLogObject(data: any) {
    const result = {};

    if (
      data instanceof String ||
      typeof data === 'string' ||
      typeof data === 'number'
    ) {
      Object.assign(result, { content: JSON.stringify(data) });
    } else if (typeof data === 'object' && data !== null) {
      if (
        data.hasOwnProperty('message') &&
        data.message.hasOwnProperty('es_index')
      ) {
        Object.assign(result, { es_index: data.message.es_index });
        delete data.message.es_index;
      }

      Object.assign(result, CommonHelper.flatten(data));
    }

    return result;
  }
}
