import winston, * as winstonHelper from 'winston';
export default class LoggerModule {
    logger: winston.Logger;
    constructor(opt?: winstonHelper.LoggerOptions);
}
