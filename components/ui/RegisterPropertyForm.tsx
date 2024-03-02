import { Button, Form, Input, InputNumber, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractContext } from '../shared/context/ContractContext';
import { User } from '@/lib/model/domain_definitions';

export default function RegisterPropertyForm(props: { userProfile: User | null }) {
  const { contractInstance } = useContractContext() || {};
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onFinish(values: any) {
    try {
      setLoading(true);
      const tx = await contractInstance!.registerProperty(
        values.postalAddress,
        values.description,
        values.price,
        values.securityDeposit,
        values.landlordName,
        values.landlordPhone,
        props.userProfile?.email
      );
      await tx.wait();
      setLoading(false);
      notification.success({
        message: 'Registro de propiedad',
        description: 'Propiedad registrada correctamente',
      });
      router.push('/dashboard/properties');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
      name="basic"
      labelCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title>Registrar nueva propiedad</Title>
      <Form.Item
        label="Dirección"
        name="postalAddress"
        rules={[{ required: true, message: 'Please enter your postal address' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Descripción"
        name="description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Precio"
        name="price"
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Depósito de seguridad"
        name="securityDeposit"
        rules={[{ required: true, message: 'Please enter a deposit' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Nombre"
        name="landlordName"
        rules={[{ required: true, message: 'Please enter your landlord name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Télefono"
        name="landlordPhone"
        rules={[{ required: true, message: 'Please enter your landlord phone' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
