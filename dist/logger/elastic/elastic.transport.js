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
        this.date = data;
        setImmediate(() => {
            this.emit('logged', this.date);
        });
        const logObject = this.getLogObject();
        const client = new elastic_client_js_1.default();
        client.send(logObject).catch((e) => {
            console.error('Error while sending log to ES', e);
        });
        callback();
    }
    getLogObject() {
        const result = {};
        this.setLogObjectMessage(result);
        this.setLogObjectBody(result);
        return result;
    }
    setLogObjectMessage(result) {
        const message = common_helper_1.CommonHelper.findValInObject(this.date, 'message');
        const isString = message instanceof String || typeof message === 'string';
        if (typeof message !== 'undefined' &&
            (isString || typeof message === 'number')) {
            Object.assign(result, { message: message });
        }
        else {
            if (typeof message === 'object' && message !== null) {
                Object.assign(this.date, message);
            }
            Object.assign(result, { message: 'Message not found in log object' });
        }
    }
    setLogObjectBody(result) {
        if (typeof this.date === 'object') {
            const index = common_helper_1.CommonHelper.findValInObject(this.date, 'es_index');
            if (typeof index !== 'undefined') {
                Object.assign(result, { es_index: index });
            }
            const level = common_helper_1.CommonHelper.findValInObject(this.date, 'level');
            if (typeof level !== 'undefined') {
                Object.assign(result, { level: level });
            }
            try {
                Object.assign(result, { ctx: JSON.stringify(this.date, null, 2) });
            }
            catch (e) {
                console.error('Error while stringify data for ES', e);
            }
        }
    }
}
exports.ElasticTransport = ElasticTransport;
