import LoggerModule from './logger.module';

describe('Logging to Kibana', () => {
    it('should check if Logger module instance creates successfully', async () => {
        const logger = new LoggerModule().logger;
        expect(typeof logger.log).toStrictEqual('function');
    })
});

export {}