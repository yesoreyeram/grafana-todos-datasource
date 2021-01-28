import {
  DataQuery,
  DataSourceJsonData,
  DataSourcePluginOptionsEditorProps,
  QueryEditorProps as QueryEditorProperties,
} from '@grafana/data';
import { Datasource } from './datasource';

export interface DatasourceJSONOptions extends DataSourceJsonData {}
interface DatasourceSecureJSONOptions {}
interface Query extends DataQuery {}

export type ConfigEditorProps = DataSourcePluginOptionsEditorProps<DatasourceJSONOptions, DatasourceSecureJSONOptions>;
export type QueryEditorProps = QueryEditorProperties<Datasource, Query>;
