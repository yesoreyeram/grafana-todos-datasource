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
import { TodosStaticDatasource } from './todos/TodosStaticDatasource';
import { TodosDatasource } from './todos/TodosDatasource';
import { TodosServerDatasource } from './todos/TodosServerDatasource';
import { TodosServerDynamicDatasource } from './todos/TodosServerDynamicDatasource';

export default class Datasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  pseudoDatasource: Record<EntitiyType, DataSourceWithBackend>;
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
    const pseudoDatasource: any = {};
    pseudoDatasource[EntitiyType.ToDosClient] = new TodosDatasource(instanceSettings);
    pseudoDatasource[EntitiyType.ToDosStatic] = new TodosStaticDatasource(instanceSettings);
    pseudoDatasource[EntitiyType.ToDosServer] = new TodosServerDatasource(instanceSettings);
    pseudoDatasource[EntitiyType.ToDosServerDynamic] = new TodosServerDynamicDatasource(instanceSettings);
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
    const promises: any[] = [];
    Object.keys(this.pseudoDatasource).forEach(key => {
      promises.push(this.pseudoDatasource[key as EntitiyType].testDatasource());
    });
    return Promise.all(promises).then(response => {
      return {
        message: response.map(r => r.message).join('; ') + '.',
        status: response.every(r => r.status === 'success') ? 'success' : 'error',
      };
    });
  }
}
