/**
 * Created by lamtanphiho on 8/23/2017.
 */
import React, {Component} from 'react';
import {Modal, Form, Icon, Input, Button, Checkbox } from 'antd';
import {Redirect} from 'react-router-dom'
const FormItem = Form.Item;
const request = require('../../controllers/request')

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    handleSubmit = (e) => {
        e.preventDefault();

        console.log(1);

        this.props.form.validateFields((err, values) => {
            if (!err) {
         /*       const option = {
                    method : 'POST',
                    url : process.env.API_URL + '/user/login',
                    form : {
                        emailId     : values.userName,
                        password    : values.password,
                        deviceType  : "IOS",
                        deviceToken : "1"
                    }
                }
                request.request(option).then(user=>{
                    localStorage.setItem("user", JSON.stringify(user.data));
                    window.location.reload()
                })*/
            }
        });
    }
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Login"
                onCancel={onCancel}
                footer={null}
                className="modal-login"
            >
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>

            </Form>
                <style>{css}</style>
            </Modal>
        );
    }
}

const css = `
.ant-modal.modal-login {
    width: 330px !important;
}
.login-form {
  max-width: 300px;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}`;
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm