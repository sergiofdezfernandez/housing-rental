'use client';
import { Button, Form, Input, notification, Card, Tooltip, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useContractContext } from './shared/context/ContractContext';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

export default function RentPropertyForm(props: { userEmail: string }) {
  const searchParams = useSearchParams();
  const { contractInstance } = useContractContext() || {};
  const { address } = useWeb3ModalAccount();

  async function onFinish(values: any) {
    contractInstance
      ?.rentProperty(
        {
          id: address,
          name: values.tenantName,
          phoneNumber: values.tenantPhone,
          email: props.userEmail,
        },
        Number(searchParams.get('propertyId')!),
        values.duration,
        values.deposit,
        {
          value: Number(searchParams.get('price')!),
        }
      )
      .then(() => {
        notification.success({
          message: 'Propuesta de alquiler de propiedad enviada',
          description: 'Propuesta enviada correctamente',
        });
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Title level={2}>Alquilar propiedad</Title>
      <Card
        bordered={false}
        actions={[
          <Form.Item key={'submit'}>
            <Button type="default" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>,
        ]}
      >
        <Flex gap={'small'} vertical wrap="wrap">
          <Form.Item
            label="Nombre"
            name="tenantName"
            rules={[{ required: true, message: 'Please enter your tenant name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="tenantPhone"
            rules={[{ required: true, message: 'Please enter your tenant phone' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Duración"
            name="duration"
            rules={[{ required: true, message: 'Please enter the lease duration' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Tooltip title="Depósito de seguridad marcado por el arrendador">
            <Form.Item
              label="Depósito de seguridad"
              name="deposit"
              initialValue={searchParams.get('securityDeposit')}
              rules={[
                {
                  message: 'Please enter the property security deposit',
                },
              ]}
            >
              <Input type="number" disabled />
            </Form.Item>
          </Tooltip>
        </Flex>
      </Card>
    </Form>
  );
}
