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
}

export interface DatasourceJSONOptions extends DataSourceJsonData {}
interface DatasourceSecureJSONOptions {}
export interface Query extends DataQuery {
  entity: EntitiyType;
}

export type ConfigEditorProps = DataSourcePluginOptionsEditorProps<DatasourceJSONOptions, DatasourceSecureJSONOptions>;
export type QueryEditorProps = QueryEditorProperties<Datasource, Query>;
