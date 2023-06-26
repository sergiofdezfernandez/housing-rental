import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Col,
  Row,
  Card,
} from "antd";
import Title from "antd/es/typography/Title";
import { AnyARecord } from "dns";
import React from "react";
import { IWeb3Context, useWeb3Context } from "../web3/Web3Context";
import { JsonRpcError } from "ethers";

const RegisterPropertyForm: React.FC = () => {
  const {
    state: { contract },
  } = useWeb3Context() as IWeb3Context;

  async function onFinish(values: any) {
    try {
      const tx = await contract.registerProperty(
        values.postalAddress,
        values.description,
        values.price,
        values.securityDeposit,
        values.landlordName,
        values.landlordPhone,
        values.landlordEmail
      );
      await tx.wait();
      notification.success({
        message: "Registro de propiedad",
        description: "Propiedad registrada correctamente",
      });
    } catch (error: any) {
      notification.error({ message: error.code, description: error.reason });
      console.log(error);
    }
  }

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2}>Registrar propiedad</Title>
      <Card
        bordered={false}
        actions={
          [<Form.Item key={"submit"}>
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </Form.Item>]
        }
      >
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
        <Form.Item
          label="securityDeposit"
          name="securityDeposit"
          rules={[{ required: true, message: "Please enter a deposit" }]}
        >
          <InputNumber />
        </Form.Item>
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
      </Card>
    </Form>
  );
};

export default RegisterPropertyForm;
