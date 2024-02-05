'use client';
import { Button, Form, Input, notification, Card, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import type { IWeb3Context } from './web3/Web3Context';
import { useWeb3Context } from './web3/Web3Context';
import { useSearchParams } from 'next/navigation';
import { RentPropertyFormModel } from '../lib/model/forms_definitions';
import { handleError } from './shared/error_handler';

const RentPropertyForm: React.FC = () => {
  const {
    state: { contract, address },
  } = useWeb3Context() as IWeb3Context;
  const searchParams = useSearchParams();

  async function onFinish(values: RentPropertyFormModel) {
    const aux = Number(searchParams.get('price')!);
    console.log(aux);
    contract
      ?.rentProperty(
        {
          id: address,
          name: values.tenantName,
          phoneNumber: values.tenantPhone,
          email: values.tenantEmail,
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
        handleError(error);
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
          label="Correo electrónico"
          name="tenantEmail"
          rules={[
            { required: true, message: 'Please enter your tenant email' },
            {
              message: 'El email debe estar en un formato correcto',
              pattern: RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
            },
          ]}
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
      </Card>
    </Form>
  );
};

export default RentPropertyForm;