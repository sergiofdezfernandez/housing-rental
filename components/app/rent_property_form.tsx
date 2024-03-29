import { Button, Form, Input, notification, Card, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { IWeb3Context, useWeb3Context } from "../web3/Web3Context";
import { useSearchParams } from "next/navigation";

const RentPropertyForm: React.FC = () => {
  const {
    state: { contract, address },
  } = useWeb3Context() as IWeb3Context;

  const searchParams = useSearchParams();

  async function onFinish(values: any) {
    try {
      const tx = await contract.rentProperty(
        {
          id: address,
          name: values.tenantName,
          phoneNumber: values.tenantPhone,
          email: values.tenantEmail,
        },
        searchParams.get("propertyId"),
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
              Aceptar
            </Button>
          </Form.Item>,
        ]}
      >
        <Form.Item
          label="Nombre"
          name="tenantName"
          rules={[{ required: true, message: "Please enter your tenant name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Teléfono"
          name="tenantPhone"
          rules={[
            { required: true, message: "Please enter your tenant phone" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Correo electrónico"
          name="tenantEmail"
          rules={[
            { required: true, message: "Please enter your tenant email" },
            {
              message: "El email debe estar en un formato correcto",
              pattern: RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Duración"
          name="duration"
          rules={[
            { required: true, message: "Please enter the lease duration" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Tooltip title="Depósito de seguridad marcado por el arrendador">
          <Form.Item
            label="Depósito de seguridad"
            name="deposit"
            initialValue={searchParams.get("securityDeposit")}
            rules={[
              {
                message: "Please enter the property security deposit",
              },
            ]}
          >
            <Input type="number" disabled />
          </Form.Item>
        </Tooltip>
      </Card>
    </Form>
  );
};

export default RentPropertyForm;
