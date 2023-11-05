import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import { UserOutlined } from "@ant-design/icons";
import { Form, Card, Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import { LoginForm } from "../components/model/forms_models";
import { handleAuthError } from "../components/app/shared/error_handler";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        router.push("/");
      }
    };
    checkSession();
  }, [user]);

  const handleLogin = async (values: LoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      handleAuthError(error);
    } else {
      router.push("/");
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      onFinish={handleLogin}
      autoComplete="off"
    >
      <Title level={2}>Iniciar sesión</Title>
      <Card
        bordered={false}
        actions={[
          <Form.Item key={"submit"}>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>,
        ]}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Introduce el email" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Introduce la password" }]}
        >
          <Input type="password" />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default LoginPage;
