import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Card, Button, Input, Flex, Col, Row } from 'antd';
import Link from 'next/link';
import { login } from '@/app/auth/actions';

export default function LoginForm() {
  return (
    <section>
      <Form name="basic" labelCol={{ span: 8 }} autoComplete="off" onFinish={login}>
        <Flex align="center" justify="center" style={{ height: '90vh' }} wrap="wrap">
          <Card
            actions={[
              <Link href={'/auth/signup'} className="textCenter">
                ¿No estas registrado? Registrate aquí
              </Link>,
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
              <Input type="password" prefix={<LockOutlined />} />
            </Form.Item>
            <Row justify="center">
              <Col>
                <Form.Item key={'submit'} className="text-center">
                  <Button type="default" htmlType="submit">
                    Enviar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Flex>
      </Form>
    </section>
  );
}
