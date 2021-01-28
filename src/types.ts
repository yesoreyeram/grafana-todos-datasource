import {
  DataQuery,
  DataSourceJsonData,
  DataSourcePluginOptionsEditorProps,
  QueryEditorProps as QueryEditorProperties,
} from '@grafana/data';
import Datasource from './datasource';

export enum EntitiyType {
  ToDosStatic = 'todos-static',
  ToDosClient = 'todos-client',
  ToDosServer = 'todos-server',
  ToDosServerDynamic = 'todos-server-dynamic',
}

export enum JSONPlaceholderTypes {
  Todos = 'todos',
  Posts = 'posts',
  Users = 'users',
}

export interface DatasourceJSONOptions extends DataSourceJsonData {}
interface DatasourceSecureJSONOptions {}
export interface Query extends DataQuery {
  entity: EntitiyType;
  jsonplaceholdertype?: JSONPlaceholderTypes;
}

export type ConfigEditorProps = DataSourcePluginOptionsEditorProps<DatasourceJSONOptions, DatasourceSecureJSONOptions>;
export type QueryEditorProps = QueryEditorProperties<Datasource, Query>;
