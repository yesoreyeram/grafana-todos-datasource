import { flatten } from 'lodash';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceInstanceSettings,
  DataSourceApi,
  LoadingState,
} from '@grafana/data';
import { Query, DatasourceJSONOptions, EntitiyType } from './types';
import { UsersDatasource } from './users/UsersDatasource';
import { TodosDatasource } from './todos/TodosDatasource';

export default class Datasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  usersDatasource: UsersDatasource;
  todosDatasource: TodosDatasource;
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
    this.usersDatasource = new UsersDatasource(instanceSettings);
    this.todosDatasource = new TodosDatasource(instanceSettings);
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach((target: Query) => {
      switch (target.entity) {
        case EntitiyType.Users:
          promises.push(this.usersDatasource.query({ ...request, targets: [target] }));
          break;
        case EntitiyType.ToDos:
          promises.push(this.todosDatasource.query({ ...request, targets: [target] }));
          break;
        default:
          break;
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
