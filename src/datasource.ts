import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  LoadingState,
  toDataFrame,
} from '@grafana/data';
import { Query, DatasourceJSONOptions } from './types';
import { users } from './data';

export class Datasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  constructor(instanceSettings: any) {
    super(instanceSettings);
  }
  private getUsersList(): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      resolve(toDataFrame(users));
    });
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach(() => {
      promises.push(this.getUsersList());
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
