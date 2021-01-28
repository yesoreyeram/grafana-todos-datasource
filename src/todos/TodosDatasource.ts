import {
  DataSourceApi,
  DataSourceInstanceSettings,
  DataQueryRequest,
  DataQueryResponse,
  toDataFrame,
  LoadingState,
  DataFrame,
} from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { EntitiyType, Query, DatasourceJSONOptions } from '../types';

export class TodosDatasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
  }
  getToDos(): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      getBackendSrv()
        .fetch({
          url: 'https://jsonplaceholder.typicode.com/todos',
        })
        .toPromise()
        .then(response => {
          resolve(toDataFrame(response.data));
        });
    });
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach(target => {
      if (target.entity === EntitiyType.ToDos) {
        promises.push(this.getToDos());
      }
    });
    return Promise.all(promises).then(response => {
      return {
        state: LoadingState.Done,
        data: response,
      };
    });
  }
  testDatasource() {
    return new Promise(resolve => {
      resolve({
        message: 'Todos datasource working',
        status: 'success',
      });
    });
  }
}
