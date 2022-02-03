import LoggerModule from './logger/logger.module.js';
export default class Utils {
    static logger(opt) {
        return new LoggerModule(opt).logger;
    }
}
//# sourceMappingURL=index.js.map