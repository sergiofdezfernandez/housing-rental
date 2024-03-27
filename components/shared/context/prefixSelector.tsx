import React from 'react';
import { Form, Select } from 'antd'; // Assuming your imports
const { Option } = Select;
const PrefixSelector = () => {
  return (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="34">+34</Option>
      </Select>
    </Form.Item>
  );
};

export default PrefixSelector;
