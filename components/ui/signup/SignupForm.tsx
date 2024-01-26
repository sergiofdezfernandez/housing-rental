import { handleAuthError } from '@/components/shared/error_handler';
import { SignUpForm } from '@/lib/model/forms_definitions';
import { UserOutlined } from '@ant-design/icons';
import { AuthError } from '@supabase/supabase-js';
import { Form, Card, Button, Input, Select, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const handleSubmit = async (values: SignUpForm) => {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const body: AuthError = await response.json();
      if (body.status === 200) {
        router.push('/properties');
      } else {
        handleAuthError(body);
      }
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      initialValues={{ role: 'TENANT' }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Flex align="center" justify="center" style={{ height: '90vh' }} wrap="wrap">
        <Title level={2}></Title>
        <Card
          bordered={false}
          actions={[
            <Form.Item key={'submit'}>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>,
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
