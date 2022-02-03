import { config } from '../config.js';
import winston from 'winston';
import { ElasticTransport } from './elastic/elastic.transport.js';
export default class LoggerModule {
    constructor(opt) {
        this.logger = winston.createLogger(Object.assign({}, {
            defaultMeta: { service: config.service },
            format: winston.format.json(),
            transports: [new ElasticTransport()],
        }, opt));
        if (config.env !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.prettyPrint(),
            }));
        }
    }
}
//# sourceMappingURL=logger.module.js.map