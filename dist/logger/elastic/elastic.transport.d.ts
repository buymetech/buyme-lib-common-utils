import Transport, * as transportHelper from 'winston-transport';
export declare class ElasticTransport extends Transport {
    private opts;
    constructor(opts?: transportHelper.TransportStreamOptions);
    log(info: any, callback: () => void): void;
}
