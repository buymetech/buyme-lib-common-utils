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

  log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const logObject = this.getLogObject(info);
    const client = new ElasticClient();

    client.send(logObject).catch((error) => {
      console.error('Error while sending log to ES', error);
    });

    callback();
  }

  getLogObject(info: unknown) {
    const result = {
      content: '',
    };

    if (
      info instanceof String ||
      typeof info === 'string' ||
      typeof info === 'number'
    ) {
      result.content = JSON.stringify(info);
    } else if (typeof info === 'object' && info !== null) {
      Object.assign(result, CommonHelper.flatten(info));
    }

    return result;
  }
}
