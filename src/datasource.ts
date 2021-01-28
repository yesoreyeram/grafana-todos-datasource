import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  LoadingState,
  toDataFrame,
} from '@grafana/data';
import { Query, DatasourceJSONOptions, EntitiyType } from './types';
import { users } from './data';

export class Datasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  constructor(instanceSettings: any) {
    super(instanceSettings);
  }
  private getTodos(): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
          resolve(toDataFrame(json));
        });
    });
  }
  private getUsersList(): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      resolve(toDataFrame(users));
    });
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach(target => {
      if (target.entity === EntitiyType.Users) {
        promises.push(this.getUsersList());
      } else if (target.entity === EntitiyType.ToDos) {
        promises.push(this.getTodos());
      }
    });
    return Promise.all(promises).then(response => {
      return {
        state: LoadingState.Done,
        data: response,
      };
    });
  }
  testDatasource(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ message: 'No checks performed', status: 'success' });
    });
  }
}
