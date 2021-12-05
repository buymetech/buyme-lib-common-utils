import Transport, * as transportHelper from 'winston-transport';
import ecsFormat from '@elastic/ecs-winston-format';
import ElasticClient from './elastic.client.js';

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

        const client = new ElasticClient()
        client.send(info);

        callback();
    }
}