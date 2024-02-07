import { signup } from '@/app/auth/actions';
import { UserOutlined } from '@ant-design/icons';
import { Form, Card, Button, Input, Select, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

export default function SignupForm() {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      initialValues={{ role: 'TENANT' }}
      onFinish={signup}
      autoComplete="off"
    >
      <Flex align="center" justify="center" style={{ height: '90vh' }} wrap="wrap">
        <Title level={2}></Title>
        <Card
          bordered={false}
          actions={[
            <Link href={'/login'} className="textCenter">
              Iniciar sesión
            </Link>,
            <Button htmlType="submit">Enviar</Button>,
          ]}
          title="Registrarse"
        >
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Introduce el email' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Introduce la password' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item label="role" name="role">
            <Select
              options={[
                { value: 'TENANT', label: 'Arrendatario' },
                { value: 'LANDLORD', label: 'Arrendador' },
              ]}
            />
          </Form.Item>
        </Card>
      </Flex>
    </Form>
  );
}
