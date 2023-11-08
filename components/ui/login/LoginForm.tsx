import { UserOutlined } from '@ant-design/icons';
import { Form, Card, Button, Input, Flex } from 'antd';
import { type LoginForm } from '@/lib/model/forms_definitions';
import { useRouter } from 'next/navigation';
import { AuthError } from '@supabase/supabase-js';
import { handleAuthError } from '@/components/app/shared/error_handler';

export default function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (values: LoginForm) => {
    const response = await fetch('http://localhost:3000/auth/login', {
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
    <Form name="basic" labelCol={{ span: 8 }} autoComplete="off" onFinish={handleSubmit}>
      <Flex align="center" justify="center" style={{ height: '90vh' }} wrap="wrap">
        <Card
          actions={[
            <Form.Item key={'submit'}>
              <Button type="default" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>,
          ]}
          title="Iniciar sesión"
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
        </Card>
      </Flex>
    </Form>
  );
}
