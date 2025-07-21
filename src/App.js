import React, { useState } from 'react';
import { Tabs } from 'antd';
import SchemaBuilder from './components/SchemaBuilder';
import JSONPreview from './components/JSONPreview';

const App = () => {
  const [schema, setSchema] = useState([]);

  const items = [
    {
      key: '1',
      label: 'Builder',
      children: <SchemaBuilder schema={schema} setSchema={setSchema} />
    },
    {
      key: '2',
      label: 'JSON Preview',
      children: <JSONPreview schema={schema} />
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>🛠 JSON Schema Builder</h2>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;