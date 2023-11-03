import { supabase } from '../lib/supabase';
import notification from "antd/es/notification";
import { Button, Card, Form, Input, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { handleSignUpError } from '../components/app/shared/error_handler';
import { SignUpModel } from '../components/model/forms_models';
import Title from 'antd/es/typography/Title';

export default function SignUp() {
    const [form] = Form.useForm()
    const updateRole = async (userId:string, role:string) => {
        const { data, error } = await supabase
            .from('user_roles')
            .insert({ id:userId,role_name: role })
        if (error) {
            console.error('Error updating role:', error);
        } else {
            console.log('Role updated:', data);
        }
    };

    async function onFinish(values: SignUpModel) {
        try {
        const { data, error } = await supabase.auth.signUp({email:values.email,password:values.password});
        if (error) {
            handleSignUpError(error)
            return;
        }
        await updateRole(data.user?.id!, values.role);
        notification.success({message:`Se ha registrado ${data.user?.email} correctamente`})
        } catch (error) {
        console.error('Sign up error', error);
        }
    };

  function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  return (
    <Form name="basic"
    labelCol={{ span: 4 }}
    initialValues={{role:"TENANT"}}
    onFinish={onFinish}
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
        <Form.Item label="role" name="role" >
        <Select
          defaultValue="TENANT"
          options={[
            {value:'TENANT',label:'Arrendatario'},
            {value: 'LANDLORD',label:'Arrendador'}
          ]}
        />
         </Form.Item>
         </Card>
         </Form>
  );
}
