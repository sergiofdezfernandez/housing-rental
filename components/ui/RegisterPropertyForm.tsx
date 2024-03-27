import { Button, Flex, Form, Input, InputNumber, notification } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContractContext } from '../shared/context/ContractContext';
import { User } from '@/lib/model/domain_definitions';
import Card from 'antd/es/card/Card';
import PrefixSelector from '../shared/context/prefixSelector';

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
        Number(values.price),
        Number(values.securityDeposit),
        values.landlordName,
        '(' + values.prefix + ')' + values.landlordPhone,
        props.userProfile?.email
      );
      await tx.wait();
      setLoading(false);
      notification.success({
        message: 'Registro de propiedad',
        description: 'Propiedad registrada correctamente',
      });
      router.push('/dashboard/properties');
    } catch (error: any) {
      notification.error({ message: error.reason });
      setLoading(false);
    }
  }
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      {...{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title level={1}>Registrar nueva propiedad</Title>
      <Card
        actions={[
          <Button type="default" htmlType="submit" loading={loading}>
            Enviar
          </Button>,
        ]}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          Datos de la propiedad
        </Title>
        <Flex vertical justify="space-around">
          <Form.Item
            label="Dirección"
            name="postalAddress"
            rules={[{ required: true, message: 'Please enter your postal address' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
            hasFeedback
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Precio"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
            hasFeedback
          >
            <InputNumber addonAfter={'€'} />
          </Form.Item>
          <Form.Item
            label="Depósito de seguridad"
            name="securityDeposit"
            rules={[{ required: true, message: 'Please enter a deposit' }]}
            hasFeedback
          >
            <InputNumber addonAfter={'€'} />
          </Form.Item>
        </Flex>
        <Title level={3} style={{ textAlign: 'center' }}>
          Datos del propietario
        </Title>
        <Flex gap="middle" justify="space-around" vertical>
          <Form.Item
            label="Nombre"
            name="landlordName"
            rules={[{ required: true, message: 'Please enter your landlord name' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Télefono"
            name="landlordPhone"
            rules={[
              { required: true, message: 'Please enter your landlord phone' },
              {
                pattern: new RegExp('(?:6[0-9]|7[1-9])[0-9]{7}$'),
                message: 'El número no es correcto',
              },
            ]}
            hasFeedback
          >
            <Input addonBefore={<PrefixSelector />} style={{ width: '100%' }} />
          </Form.Item>
        </Flex>
      </Card>
    </Form>
  );
}
