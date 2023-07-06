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

const RentPropertyForm: React.FC = () => {
  const {
    state: { contract },
  } = useWeb3Context() as IWeb3Context;

  async function onFinish(values: any) {
    try {
      const tx = await contract.rentProperty(
        {
          address: values.tenantAddress,
          name: values.tenantName,
          phoneNumber: values.tenantPhone,
          email: values.tenantEmail,
        },
        values.propertyId,
        values.duration,
        values.deposit
      );
      await tx.wait();
      notification.success({
        message: "Propuesta de alquiler de propiedad enviada",
        description: "Propuesta enviada correctamente",
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
      <Title level={2}>Alquilar propiedad</Title>
      <Card
        bordered={false}
        actions={[
          <Form.Item key={"submit"}>
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </Form.Item>,
        ]}
      >
        <Form.Item
          label="tenantAddress"
          name="tenantAddress"
          rules={[
            { required: true, message: "Please enter your tenant address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="tenantName"
          name="tenantName"
          rules={[
            { required: true, message: "Please enter your tenant name" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="tenantPhone"
          name="tenantPhone"
          rules={[
            { required: true, message: "Please enter your tenant phone" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="tenantEmail"
          name="tenantEmail"
          rules={[
            { required: true, message: "Please enter your tenant email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="propertyId"
          name="propertyId"
          rules={[
            { required: true, message: "Please enter the property id" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="duration"
          name="duration"
          rules={[
            { required: true, message: "Please enter the lease duration" },
          ]}
        >
          <Input type="number"/>
        </Form.Item>
        <Form.Item
          label="deposit"
          name="deposit"
          rules={[
            { required: true, message: "Please enter the property security deposit" },
          ]}
        >
          <Input type="number"/>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default RentPropertyForm;
