"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_js_1 = require("../../config.js");
const elasticsearch_1 = require("@elastic/elasticsearch");
class ElasticClient {
    constructor() {
        var _a, _b, _c;
        this.client = new elasticsearch_1.Client({
            cloud: {
                id: (_a = config_js_1.config.elastic.cloud_id) !== null && _a !== void 0 ? _a : '',
            },
            auth: {
                username: (_b = config_js_1.config.elastic.username) !== null && _b !== void 0 ? _b : '',
                password: (_c = config_js_1.config.elastic.password) !== null && _c !== void 0 ? _c : '',
            },
        });
    }
    send(logObject, idx = config_js_1.config.elastic.index) {
        const dt = new Date();
        return this.client.index({
            index: 'es_index' in logObject ? logObject.es_index : idx,
            refresh: true,
            body: Object.assign({ '@timestamp': dt.toISOString(), service: config_js_1.config.service_name }, logObject),
        });
    }
}
exports.default = ElasticClient;
