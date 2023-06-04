import { Button, Checkbox, Form, Input } from 'antd';
import exp from 'constants';
import { AnyARecord } from 'dns';
import React from "react";

class RegisterPropertyForm extends React.Component {

    onFinish(values: AnyARecord) {
        console.log('Success:', values);
    }

    onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    }

    render() {
        return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        )
    }
}

export default RegisterPropertyForm;