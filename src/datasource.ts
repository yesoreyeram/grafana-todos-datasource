import { flatten } from 'lodash';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceInstanceSettings,
  DataSourceApi,
  LoadingState,
} from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { Query, DatasourceJSONOptions, EntitiyType } from './types';
import { UsersDatasource } from './users/UsersDatasource';
import { TodosDatasource } from './todos/TodosDatasource';

export default class Datasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  pseudoDatasource: Record<EntitiyType, DataSourceWithBackend>;
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
    const pseudoDatasource: any = {};
    pseudoDatasource[EntitiyType.Users] = new UsersDatasource(instanceSettings);
    pseudoDatasource[EntitiyType.ToDos] = new TodosDatasource(instanceSettings);
    this.pseudoDatasource = pseudoDatasource;
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach((target: Query) => {
      if (this.pseudoDatasource[target.entity]) {
        promises.push(this.pseudoDatasource[target.entity].query({ ...request, targets: [target] }));
      }
    });
    return Promise.all(promises).then(response => {
      return {
        state: LoadingState.Done,
        data: flatten(response.map(r => r.data)),
      };
    });
  }
  testDatasource(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ message: 'No checks performed', status: 'success' });
    });
  }
}
