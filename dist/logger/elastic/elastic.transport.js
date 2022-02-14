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
        this.setLogObjectMessage(result, this.date);
        this.setLogObjectBody(result);
        return result;
    }
    setLogObjectMessage(result, data) {
        if (data instanceof String ||
            typeof data === 'string' ||
            typeof data === 'number') {
            Object.assign(result, { message: data });
        }
    }
    setLogObjectBody(result) {
        if (typeof this.date === 'object') {
            const customIndex = common_helper_1.CommonHelper.findValInObject(this.date, 'es_index');
            if (typeof customIndex !== 'undefined') {
                Object.assign(result, { es_index: customIndex });
            }
            if (this.date.hasOwnProperty('message')) {
                this.setLogObjectMessage(result, this.date.message);
            }
            else {
                Object.assign(result, { message: 'Message not found in log object' });
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
