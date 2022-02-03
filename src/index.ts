import * as winstonHelper from 'winston';
import LoggerModule from './logger/logger.module.js';

export default class Utils {
  static logger(opt?: winstonHelper.LoggerOptions) {
    return new LoggerModule(opt).logger;
  }
}
