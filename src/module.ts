import { DataSourcePlugin } from '@grafana/data';
import Datasource from './datasource';
import { ConfigEditor } from './editors/configEditor';
import { QueryEditor } from './editors/queryEditor';

export const plugin = new DataSourcePlugin(Datasource).setConfigEditor(ConfigEditor).setQueryEditor(QueryEditor);
