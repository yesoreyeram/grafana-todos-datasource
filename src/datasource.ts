import { DataQueryRequest, DataQueryResponse, DataSourceApi, LoadingState } from '@grafana/data';
import { DatasourceJSONOptions } from './types';

export class Datasource extends DataSourceApi<any, DatasourceJSONOptions> {
  constructor(instanceSettings: any) {
    super(instanceSettings);
  }
  query(request: DataQueryRequest): Promise<DataQueryResponse> {
    return new Promise((resolve, reject) => {
      resolve({
        state: LoadingState.Done,
        data: [],
      });
    });
  }
  testDatasource(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ message: 'No checks performed', status: 'success' });
    });
  }
}
