"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticTransport = void 0;
const winston_transport_1 = __importDefault(require("winston-transport"));
const ecs_winston_format_1 = __importDefault(require("@elastic/ecs-winston-format"));
const elastic_client_js_1 = __importDefault(require("./elastic.client.js"));
const common_helper_1 = require("../../helpers/common.helper");
class ElasticTransport extends winston_transport_1.default {
    constructor(opts) {
        super(opts);
        this.opts = opts || {};
        this.opts.format = (0, ecs_winston_format_1.default)();
    }
    log(data, callback) {
        setImmediate(() => {
            this.emit('logged', data);
        });
        const logObject = this.getLogObject(data);
        const client = new elastic_client_js_1.default();
        client.send(logObject).catch((error) => {
            console.error('Error while sending log to ES', error);
        });
        callback();
    }
    getLogObject(data) {
        const result = {};
        if (data instanceof String ||
            typeof data === 'string' ||
            typeof data === 'number') {
            Object.assign(result, { content: JSON.stringify(data) });
        }
        else if (typeof data === 'object' && data !== null) {
            if (data.hasOwnProperty('message') &&
                data.message.hasOwnProperty('es_index')) {
                Object.assign(result, { es_index: data.message.es_index });
                delete data.message.es_index;
            }
            Object.assign(result, common_helper_1.CommonHelper.flatten(data));
        }
        return result;
    }
}
exports.ElasticTransport = ElasticTransport;
