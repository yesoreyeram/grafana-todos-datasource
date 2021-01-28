import React from 'react';
import { Select } from '@grafana/ui';
import { QueryEditorProps, EntitiyType } from './../types';

const Entities = [
  { label: 'Todos Client', value: EntitiyType.ToDosClient },
  { label: 'Todos Static', value: EntitiyType.ToDosStatic },
  { label: 'Todos Server', value: EntitiyType.ToDosServer },
];

export const QueryEditor: React.FC<QueryEditorProps> = props => {
  const { onChange, query } = props;
  const onEntityChange = (value: EntitiyType) => {
    query.entity = value;
    onChange(query);
  };
  return (
    <>
      <div className="gf-form-inline">
        <div className="gf-form">
          <label className="gf-form-label query-keyword width-8">Entity</label>
          <Select
            className="width-12 min-width-12"
            options={Entities}
            value={Entities.find(e => e.value === query.entity)}
            onChange={e => onEntityChange(e.value as EntitiyType)}
          ></Select>
        </div>
      </div>
    </>
  );
};
