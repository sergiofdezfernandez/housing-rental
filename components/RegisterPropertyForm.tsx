import { Button, Form, Input, InputNumber, notification, Card } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { redirect } from 'next/navigation';
import { useContractContext } from './shared/context/ContractContext';
import { User } from '@/lib/model/domain_definitions';

export default function RegisterPropertyForm(props: { userProfile: User | null }) {
  const { contractInstance } = useContractContext() || {};

  async function onFinish(values: any) {
    try {
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
      notification.success({
        message: 'Registro de propiedad',
        description: 'Propiedad registrada correctamente',
      });
      redirect('/dashboard/properties');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title level={2}>Registrar propiedad</Title>
      <Card
        bordered={false}
        actions={[
          <Form.Item key={'submit'}>
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </Form.Item>,
        ]}
      >
        <Form.Item
          label="postalAddress"
          name="postalAddress"
          rules={[{ required: true, message: 'Please enter your postal address' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="description"
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="securityDeposit"
          name="securityDeposit"
          rules={[{ required: true, message: 'Please enter a deposit' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="landlordName"
          name="landlordName"
          rules={[{ required: true, message: 'Please enter your landlord name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="landlordPhone"
          name="landlordPhone"
          rules={[{ required: true, message: 'Please enter your landlord phone' }]}
        >
          <Input />
        </Form.Item>
      </Card>
    </Form>
  );
}
