import winston, * as winstonHelper from 'winston';
import { ElasticTransport } from './elastic/elastic.transport.js';

export default class LoggerModule {
  logger: winston.Logger;

  constructor(opt?: winstonHelper.LoggerOptions) {
    this.logger = winston.createLogger(
      Object.assign(
        {},
        {
          format: winston.format.json(),
          exitOnError: false,
          transports: [new ElasticTransport()],
        },
        opt,
      ),
    );

    this.logger.add(
      new winston.transports.Console({
        format: winston.format.prettyPrint(),
      }),
    );
  }
}
