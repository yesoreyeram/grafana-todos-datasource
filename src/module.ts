import { DataSourcePlugin } from '@grafana/data';
import { Datasource } from './datasource';
import { ConfigEditor } from './editors/configEditor';

export const plugin = new DataSourcePlugin(Datasource).setConfigEditor(ConfigEditor);
