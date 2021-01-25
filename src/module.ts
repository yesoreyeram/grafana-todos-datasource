import { DataSourcePlugin } from '@grafana/data';
import { Datasource } from "./datasource";

export const plugin = new DataSourcePlugin(Datasource)