import React from 'react';
import { Input, Select, Button, Card, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const SchemaBuilder = ({ schema, setSchema }) => {
  const handleAddField = () => {
    setSchema([...schema, { key: '', type: 'String' }]);
  };

  const handleRemoveField = (index) => {
    const updated = [...schema];
    updated.splice(index, 1);
    setSchema(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...schema];
    updated[index][field] = value;

    if (field === 'type' && value === 'Nested') {
      updated[index].fields = updated[index].fields || [];
    } else if (field === 'type' && value !== 'Nested') {
      delete updated[index].fields;
    }

    setSchema(updated);
  };

  const handleNestedChange = (index, nestedFields) => {
    const updated = [...schema];
    updated[index].fields = nestedFields;
    setSchema(updated);
  };

  return (
    <div>
      {schema.map((field, index) => (
        <Card key={index} size="small" style={{ marginBottom: 10 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Input
                placeholder="Field Name"
                value={field.key}
                onChange={(e) => handleChange(index, 'key', e.target.value)}
              />
              <Select
                value={field.type}
                style={{ width: 120 }}
                onChange={(value) => handleChange(index, 'type', value)}
              >
                <Option value="String">String</Option>
                <Option value="Number">Number</Option>
                <Option value="Nested">Nested</Option>
              </Select>
              <Button
                danger
                icon={<MinusCircleOutlined />}
                onClick={() => handleRemoveField(index)}
              />
            </Space>

            {field.type === 'Nested' && (
              <div style={{ marginLeft: 20 }}>
                <SchemaBuilder
                  schema={field.fields || []}
                  setSchema={(nested) => handleNestedChange(index, nested)}
                />
              </div>
            )}
          </Space>
        </Card>
      ))}
      <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddField}>
        Add Field
      </Button>
    </div>
  );
};

export default SchemaBuilder;