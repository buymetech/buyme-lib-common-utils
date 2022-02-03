import Transport from 'winston-transport';
import ecsFormat from '@elastic/ecs-winston-format';
import ElasticClient from './elastic.client.js';
export class ElasticTransport extends Transport {
    constructor(opts) {
        super(opts);
        this.opts = opts || {};
        this.opts.format = ecsFormat();
    }
    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        const client = new ElasticClient();
        client.send(info);
        callback();
    }
}
//# sourceMappingURL=elastic.transport.js.map