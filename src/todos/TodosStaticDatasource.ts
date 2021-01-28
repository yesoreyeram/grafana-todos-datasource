import {
  DataSourceApi,
  DataSourceInstanceSettings,
  DataQueryRequest,
  DataQueryResponse,
  toDataFrame,
  LoadingState,
  DataFrame,
} from '@grafana/data';
import { EntitiyType, Query, DatasourceJSONOptions } from '../types';
import { todos } from './data';

export class TodosStaticDatasource extends DataSourceApi<Query, DatasourceJSONOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<DatasourceJSONOptions>) {
    super(instanceSettings);
  }
  getToDos(): Promise<DataFrame> {
    return new Promise((resolve, reject) => {
      resolve(
        toDataFrame(
          todos.map((todo: any) => {
            todo.datasourcetype = 'Static';
            return todo;
          })
        )
      );
    });
  }
  query(request: DataQueryRequest<Query>): Promise<DataQueryResponse> {
    const promises: any[] = [];
    request.targets.forEach(target => {
      if (target.entity === EntitiyType.ToDosStatic) {
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
