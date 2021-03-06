"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const elastic_transport_js_1 = require("./elastic/elastic.transport.js");
class LoggerModule {
    constructor(opt) {
        this.logger = winston_1.default.createLogger(Object.assign({}, {
            format: winston_1.default.format.json(),
            exitOnError: false,
            transports: [new elastic_transport_js_1.ElasticTransport()],
        }, opt));
        this.logger.add(new winston_1.default.transports.Console({
            format: winston_1.default.format.prettyPrint(),
        }));
    }
}
exports.default = LoggerModule;
