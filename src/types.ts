import { DataSourceJsonData, DataSourcePluginOptionsEditorProps } from '@grafana/data';

export interface DatasourceJSONOptions extends DataSourceJsonData {}
interface DatasourceSecureJSONOptions {}

export type ConfigEditorProps = DataSourcePluginOptionsEditorProps<DatasourceJSONOptions, DatasourceSecureJSONOptions>;
