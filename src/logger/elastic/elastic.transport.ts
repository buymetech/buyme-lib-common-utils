import Transport, * as transportHelper from 'winston-transport';
import ecsFormat from '@elastic/ecs-winston-format';
import ElasticClient from './elastic.client.js';
import { CommonHelper } from '../../helpers/common.helper';

export class ElasticTransport extends Transport {
  private opts: transportHelper.TransportStreamOptions | undefined;
  private data: any;

  constructor(opts?: transportHelper.TransportStreamOptions) {
    super(opts);

    this.opts = opts || {};
    this.opts.format = ecsFormat();
  }

  log(data: any, callback: () => void) {
    this.data = data;

    setImmediate(() => {
      this.emit('logged', this.data);
    });

    const logObject = this.getLogObject();
    const client = new ElasticClient();

    client.send(logObject).catch((e) => {
      console.error('Error while sending log to ES', e);
    });

    callback();
  }

  getLogObject() {
    const result = {};
    this.setLogObjectMessage(result);
    this.setLogObjectBody(result);

    return result;
  }

  setLogObjectMessage(result: object) {
    const message: any = CommonHelper.findValInObject(this.data, 'message');
    const isString = message instanceof String || typeof message === 'string';
    if (
      typeof message !== 'undefined' &&
      (isString || typeof message === 'number')
    ) {
      Object.assign(result, { message: message });
    } else {
      if (typeof message === 'object' && message !== null) {
        Object.assign(this.data, message);
      }
      Object.assign(result, { message: 'Message not found in log object' });
    }
  }

  setLogObjectBody(result: object) {
    if (typeof this.data === 'object') {
      const index: any = CommonHelper.findValInObject(this.data, 'es_index');
      if (typeof index !== 'undefined') {
        Object.assign(result, { es_index: index });
      }

      const level: any = CommonHelper.findValInObject(this.data, 'level');
      if (typeof level !== 'undefined') {
        Object.assign(result, { level: level });
      }

      try {
        CommonHelper.deleteLargeProps(this.data);
        Object.assign(result, { ctx: JSON.stringify(this.data, null, 2) });
      } catch (e) {
        console.error('Error while stringify data for ES', e);
      }
    }
  }
}
