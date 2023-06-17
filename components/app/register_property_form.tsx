import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import Title from "antd/es/typography/Title";
import { AnyARecord } from "dns";
import React from "react";

const tailLayout = {
  wrapperCol: { offset: 14, span: 4 },
};

class RegisterPropertyForm extends React.Component {

  onFinish(values: AnyARecord) {
    console.log("Success:", values);
  }

  onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  render() {
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <Title level={3}>Property registration</Title>
        <Title level={4}>Porperty data</Title>
        <Form.Item
          label="postalAddress"
          name="postalAddress"
          rules={[
            { required: true, message: "Please enter your postal address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber />
        </Form.Item>
        <Title level={4}>Landlord data</Title>
        <Form.Item
          label="landlordName"
          name="landlordName"
          rules={[
            { required: true, message: "Please enter your landlord name" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="landlordEmail"
          name="landlordEmail"
          rules={[
            { required: true, message: "Please enter your landlord email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="landlordPhone"
          name="landlordPhone"
          rules={[
            { required: true, message: "Please enter your landlord phone" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="default">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default RegisterPropertyForm;
