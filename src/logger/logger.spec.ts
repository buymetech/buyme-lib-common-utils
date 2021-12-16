import winston from 'winston';
import LoggerModule from './logger.module';
import { config } from '../config';

describe('Logging to Kibana', () => {
  it('if LoggerModule instance creates successfully', async () => {
    const logger = new LoggerModule().logger;
    expect(typeof logger.log).toStrictEqual('function');
  })
});

let arrayLog: any;

//example log data
beforeEach(() => {
  arrayLog = {
    level: 'info', //in case sending .error|.info ... not need, will be override 
    message: 'real test sending from logger.spec',
    group: 11000,
    name: 'test real kibana connection',
    service: 'sending Mails', //need remove from list
    env: config.env, 
    correlation: 123456,
    userID: 123,
    startedTime: 111111
  }
})

const logger = {
  log: jest.fn()
};

const winstonMock = jest.mock('winston', () => (
  {
    format: {
      printf: jest.fn(),
      json: jest.fn(),
      prettyPrint: jest.fn()
    },
    createLogger: jest.fn().mockReturnValue(logger),
    transports: {
      Console: jest.fn()
    }
  })
);

describe("Logger tests", () => {
  let loggerMock: winston.Logger;

  test("testing func LoggerModule access", () => {
    const mockCreateLogger = jest.spyOn(winston, "createLogger");
    const LoggerModuleTest: LoggerModule = new LoggerModule();
    loggerMock = mockCreateLogger.mock.instances[0];
    expect(LoggerModuleTest).toBeInstanceOf(LoggerModule);
    expect(LoggerModuleTest).toBeDefined();
    expect(mockCreateLogger).toHaveBeenCalled();
    expect(typeof loggerMock.log).toStrictEqual('function');
    expect(typeof loggerMock.error).toStrictEqual('function');
    expect(typeof loggerMock.debug).toStrictEqual('function');
    expect(typeof loggerMock.info).toStrictEqual('function');
    expect(typeof loggerMock.warn).toStrictEqual('function');
    logger.log(arrayLog);
    expect(logger.log).toHaveBeenCalled();
  });
});
