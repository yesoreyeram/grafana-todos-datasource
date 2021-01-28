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
import { EntitiyType, Query, DatasourceJSONOptions, JSONPlaceholderTypes } from '../types';

export class TodosServerDynamicDatasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  url: string;
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
    this.url = instanceSettings.url + '';
  }
  getToDos(JSONPlaceholderType: JSONPlaceholderTypes): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      getBackendSrv()
        .fetch({
          url: `${this.url}/jsonplaceholder/${JSONPlaceholderType}`,
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
      if (target.entity === EntitiyType.ToDosServerDynamic) {
        promises.push(this.getToDos(target.jsonplaceholdertype || JSONPlaceholderTypes.Todos));
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
        message: 'Todos server dynamic datasource working',
        status: 'success',
      });
    });
  }
}
