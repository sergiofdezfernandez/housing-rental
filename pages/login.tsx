// pages/login.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { UserOutlined } from '@ant-design/icons';
import { Form, Card, Button, Input, Select } from 'antd';
import Title from 'antd/es/typography/Title';

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(user =>{
        if (user) {
            router.push('/dashboard');
          }
    })
  });

  const handleLogin = async (values:any) => {
    const { data, error } = await supabase.auth.signInWithPassword({email: values.email,password: values.password,});

    if (error) {
      // Handle login error
    } else {
      router.push('/dashboard');
    }
  };

  const onFinishFailed = (errorInfo: any) =>{
    console.log("Failed:", errorInfo);
  }

  return (
    <Form name="basic"
    labelCol={{ span: 4 }}
    initialValues={{role:"TENANT"}}
    onFinish={handleLogin}
    onFinishFailed={onFinishFailed}
    autoComplete="off">
    <Title level={2}>
        Registrarse
    </Title>
    <Card bordered={false}
    actions={[
      <Form.Item key={"submit"}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>,
    ]}> 
        <Form.Item label="email" name="email" rules={[{required:true,message:"Introduce el email"}]}>
        <Input prefix={<UserOutlined/>}/>
        </Form.Item>
        <Form.Item label="password" name="password" rules={[{required:true,message:"Introduce la password"}]}>
        <Input type='password'/>
          </Form.Item>
         </Card>
         </Form>
  );
};

export default LoginPage;