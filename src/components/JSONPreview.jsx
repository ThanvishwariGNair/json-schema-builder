import React from 'react';
import { Card } from 'antd';

const generateJSON = (schema) => {
  const result = {};
  schema.forEach((field) => {
    if (!field.key) return;
    if (field.type === 'String') result[field.key] = 'string';
    else if (field.type === 'Number') result[field.key] = 0;
    else if (field.type === 'Nested') result[field.key] = generateJSON(field.fields || []);
  });
  return result;
};

const JSONPreview = ({ schema }) => {
  const json = generateJSON(schema);

  return (
    <Card title="Live JSON Output" style={{ whiteSpace: 'pre-wrap' }}>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </Card>
  );
};

export default JSONPreview;