import Transport, * as transportHelper from 'winston-transport';
export declare class ElasticTransport extends Transport {
    private opts;
    private date;
    constructor(opts?: transportHelper.TransportStreamOptions);
    log(data: any, callback: () => void): void;
    getLogObject(): {};
    setLogObjectMessage(result: object, data: any): void;
    setLogObjectBody(result: object): void;
}
