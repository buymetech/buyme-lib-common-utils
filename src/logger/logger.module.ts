import { config } from '../config.js';
import winston, * as winstonHelper from 'winston';
import { ElasticTransport } from './elastic/elastic.transport.js';

export default class LoggerModule {
  logger: winston.Logger;

  constructor(opt?: winstonHelper.LoggerOptions) {
    this.logger = winston.createLogger(
      Object.assign(
        {},
        {
          defaultMeta: { service: config.service },
          format: winston.format.json(),
          transports: [new ElasticTransport()],
        },
        opt,
      ),
    );

    if (config.env !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.prettyPrint(),
        }),
      );
    }
  }
}
