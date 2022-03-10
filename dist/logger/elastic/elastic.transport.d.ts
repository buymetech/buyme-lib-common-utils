import Transport, * as transportHelper from 'winston-transport';
export declare class ElasticTransport extends Transport {
    private opts;
    private data;
    constructor(opts?: transportHelper.TransportStreamOptions);
    log(data: any, callback: () => void): void;
    getLogObject(): {};
    setLogObjectMessage(result: object): void;
    setLogObjectBody(result: object): void;
}
