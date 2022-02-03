import { config } from '../../config.js';
import { Client } from '@elastic/elasticsearch';
export default class ElasticClient {
    constructor() {
        var _a, _b, _c;
        this.client = new Client({
            cloud: {
                id: (_a = config.elastic.cloud_id) !== null && _a !== void 0 ? _a : '',
            },
            auth: {
                username: (_b = config.elastic.username) !== null && _b !== void 0 ? _b : '',
                password: (_c = config.elastic.password) !== null && _c !== void 0 ? _c : '',
            },
        });
    }
    send(info) {
        var _a;
        const dt = new Date();
        return this.client.index({
            index: (_a = config.elastic.index) !== null && _a !== void 0 ? _a : '',
            refresh: true,
            body: Object.assign({ '@timestamp': dt.toISOString(), service: config.service }, info),
        });
    }
}
//# sourceMappingURL=elastic.client.js.map