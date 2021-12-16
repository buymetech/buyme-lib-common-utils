import {config} from '../../config';
import {ApiResponse, Client} from '@elastic/elasticsearch';
import {TransportRequestPromise} from '@elastic/elasticsearch/lib/Transport';
import ElasticClient from './elastic.client';


jest.mock('@elastic/elasticsearch');
const ElasticSearchMockedClass = Client as jest.MockedClass<typeof Client>;

let request: any;
let response: any;

beforeEach(() => {
  ElasticSearchMockedClass.mockClear();
  const dt = new Date();
  const time = dt.toISOString();
  request = {
    message: 'tests',
    service: 'Sending Service',
    '@timestamp': time
  }
  
  response = {
    index: 'service-sendings',
    refresh: true,
    body: request
  } 
})
describe('ElasticTransport tests', () => {

  it('if the ElasticTransport called class constructor', () => {
    const ElasticClientClass = new ElasticClient();
    expect(ElasticClientClass).toBeTruthy();
  });

  it('if the ElasticTransport called  instance', () => {
    // Show that mockClear() is working:
    expect(ElasticSearchMockedClass).not.toHaveBeenCalled();
    const ElasticClientClass = new ElasticClient();
    ElasticClientClass.send(request);
    expect(ElasticSearchMockedClass.prototype.index).toHaveBeenCalledTimes(1);
  });

  it('if the ElasticClient send log to ElasticSearch', () => {
    const ElasticClientClass = new ElasticClient();
    ElasticClientClass.send(request);
    const ElasticClientMockedClassInstance = ElasticSearchMockedClass.mock.instances[0];
    expect(ElasticSearchMockedClass.prototype.index.mock.calls[0][0]).toEqual(response);
    expect(ElasticSearchMockedClass.prototype.index).toHaveBeenCalledWith(response);
    expect(ElasticSearchMockedClass.prototype.index).toHaveBeenCalledTimes(1);
  });

  it('if the ElasticClient send different logs and get results', () => {
    const ElasticClientClass = new ElasticClient();
    ElasticClientClass.send(request);
    expect(ElasticSearchMockedClass.prototype.index.mock.calls[0][0]).toEqual(response);
    request.message = response.body.message = 'test2'
    ElasticClientClass.send(request);
    // expect(ElasticSearchMockedClass.prototype.index.mock.calls[0][1]).toEqual(response); //TODO test!!!
    expect(ElasticSearchMockedClass.prototype.index).toHaveBeenCalledTimes(2);
  });
});

