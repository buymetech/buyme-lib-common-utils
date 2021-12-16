import { ElasticTransport } from './elastic.transport';
import ElasticClient from './elastic.client';
import { config } from '../../config';

jest.mock('./elastic.client');

const ElasticClientMockedClass = ElasticClient as jest.MockedClass<typeof ElasticClient>;

let request: any;
let callback: any;

beforeEach(() => {
  ElasticClientMockedClass.mockClear();
  request = {
    message: 'tests',
    service: 'Sending Service',
    env: config.env
  }
  callback = ((x: any) => x);
})
describe('ElasticTransport tests', () => {

  it('if the ElasticTransport called class constructor', () => {
    const ElasticTransportLog = new ElasticTransport();
    expect(ElasticTransportLog).toBeTruthy();
  });

  it('if the ElasticTransport called  instance', () => {
    // Show that mockClear() is working:
    expect(ElasticClientMockedClass).not.toHaveBeenCalled();
    const ElasticTransportLog = new ElasticTransport();
    const spy2 = ElasticTransportLog.log(request, callback);
    expect(typeof ElasticTransportLog.emit).toStrictEqual('function');
    expect(ElasticClientMockedClass.prototype.send).toHaveBeenCalledTimes(1);

  });

  it('if the ElasticTransport called  instance and can be send poptional params', () => {
    let opts: any;
    opts = {
      'level': 'error',
      'silent': true
    }
    const ElasticTransportLogLevel = new ElasticTransport(opts);
    expect(ElasticTransportLogLevel.level).toEqual(opts['level']);
    expect(ElasticTransportLogLevel.silent).toEqual(true);
  });

  it('if the ElasticTransport send log to ElasticClient', () => {
    const ElasticTransportLog = new ElasticTransport();
    const ElasticClientMockedClassInstance = ElasticClientMockedClass.mock.instances[0];
    ElasticTransportLog.log(request, callback);
    expect(ElasticClientMockedClass.prototype.send.mock.calls[0][0]).toEqual(request);
    expect(ElasticClientMockedClass.prototype.send).toHaveBeenCalledWith(request);
    expect(ElasticClientMockedClass.prototype.send).toHaveBeenCalledTimes(1);
    expect(ElasticTransportLog.emit('info',request)).toBeFalsy();
  });

  it('if the ElasticTransport send different logs and get results', () => {
    const ElasticTransportLog = new ElasticTransport();
    ElasticTransportLog.log(request, callback);
    expect(ElasticClientMockedClass.prototype.send.mock.calls[0][0]).toEqual(request);
    request.level = 'error'
    ElasticTransportLog.log(request, callback);
    expect(ElasticClientMockedClass.prototype.send.mock.calls[0][0]).toEqual(request);
  });

});

