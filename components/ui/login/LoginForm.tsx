import { UserOutlined } from '@ant-design/icons';
import { Form, Card, Button, Input, Flex } from 'antd';

export default function LoginForm() {
  return (
    <Form name="basic" labelCol={{ span: 8 }} autoComplete="off">
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
