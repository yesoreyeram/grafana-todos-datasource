import {
  DataSourceApi,
  DataSourceInstanceSettings,
  DataQueryRequest,
  DataQueryResponse,
  toDataFrame,
  LoadingState,
  DataFrame,
} from '@grafana/data';
import { EntitiyType, Query, DatasourceJSONOptions } from './../types';
import { users } from './data';

export class UsersDatasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
  }
  getUsersList(): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      resolve(toDataFrame(users));
    });
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach(target => {
      if (target.entity === EntitiyType.Users) {
        promises.push(this.getUsersList());
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
        message: 'User datasource working',
        status: 'success',
      });
    });
  }
}
