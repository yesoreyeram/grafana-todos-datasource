import React from 'react';
import { Select } from '@grafana/ui';
import { QueryEditorProps, EntitiyType, JSONPlaceholderTypes } from './../types';

const Entities = [
  { label: 'Todos Client', value: EntitiyType.ToDosClient },
  { label: 'Todos Static', value: EntitiyType.ToDosStatic },
  { label: 'Todos Server', value: EntitiyType.ToDosServer },
  { label: 'Todos Server Dynamic', value: EntitiyType.ToDosServerDynamic },
];

const JSONPlaceholderTypesList = [
  { label: 'Todos', value: JSONPlaceholderTypes.Todos },
  { label: 'Users', value: JSONPlaceholderTypes.Users },
  { label: 'Posts', value: JSONPlaceholderTypes.Posts },
];

export const QueryEditor: React.FC<QueryEditorProps> = props => {
  const { onChange, query } = props;
  const onEntityChange = (value: EntitiyType) => {
    query.entity = value;
    onChange(query);
  };
  const onJSONPlaceHolderChange = (value: JSONPlaceholderTypes) => {
    query.jsonplaceholdertype = value;
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
          {query.entity === EntitiyType.ToDosServerDynamic ? (
            <>
              <label className="gf-form-label query-keyword width-12">JSON Placeholder Type</label>
              <Select
                className="width-12 min-width-12"
                options={JSONPlaceholderTypesList}
                value={JSONPlaceholderTypesList.find(e => e.value === query.jsonplaceholdertype)}
                onChange={e => onJSONPlaceHolderChange(e.value as JSONPlaceholderTypes)}
              ></Select>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
