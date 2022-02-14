import Transport, * as transportHelper from 'winston-transport';
import ecsFormat from '@elastic/ecs-winston-format';
import ElasticClient from './elastic.client.js';
import { CommonHelper } from '../../helpers/common.helper';

export class ElasticTransport extends Transport {
  private opts: transportHelper.TransportStreamOptions | undefined;
  private date: any;

  constructor(opts?: transportHelper.TransportStreamOptions) {
    super(opts);

    this.opts = opts || {};
    this.opts.format = ecsFormat();
  }

  log(data: any, callback: () => void) {
    this.date = data;

    setImmediate(() => {
      this.emit('logged', this.date);
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
    this.setLogObjectMessage(result, this.date);
    this.setLogObjectBody(result);

    return result;
  }

  setLogObjectMessage(result: object, data: any) {
    if (
      data instanceof String ||
      typeof data === 'string' ||
      typeof data === 'number'
    ) {
      Object.assign(result, { message: data });
    }
  }

  setLogObjectBody(result: object) {
    if (typeof this.date === 'object') {
      const customIndex = CommonHelper.findValInObject(this.date, 'es_index');
      if (typeof customIndex !== 'undefined') {
        Object.assign(result, { es_index: customIndex });
      }

      if (this.date.hasOwnProperty('message')) {
        this.setLogObjectMessage(result, this.date.message);
      } else {
        Object.assign(result, { message: 'Message not found in log object' });
      }

      try {
        Object.assign(result, { body: JSON.stringify(this.date, null, 2) });
      } catch (e) {
        console.error('Error while stringify data for ES', e);
      }
    }
  }
}
