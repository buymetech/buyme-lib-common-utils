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
    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);
        });
        const logObject = this.getLogObject(info);
        const client = new elastic_client_js_1.default();
        client.send(logObject).catch((error) => {
            console.error('Error while sending log to ES', error);
        });
        callback();
    }
    getLogObject(info) {
        const result = {
            content: '',
        };
        if (info instanceof String ||
            typeof info === 'string' ||
            typeof info === 'number') {
            result.content = JSON.stringify(info);
        }
        else if (typeof info === 'object' && info !== null) {
            Object.assign(result, common_helper_1.CommonHelper.flatten(info));
        }
        return result;
    }
}
exports.ElasticTransport = ElasticTransport;
