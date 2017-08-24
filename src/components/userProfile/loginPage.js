/**
 * Created by lamtanphiho on 8/25/2017.
 */
import React, {Component} from 'react';
import {Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import {Redirect} from 'react-router-dom'
import reactAutoMount from 'react-auto-mount';
const request = require('../../controllers/request')
const FormItem = Form.Item;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : false
        }
    }
    componentDidMount= function () {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const option = {
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
                    localStorage.setItem("user", JSON.stringify(user.data))
                    this.setState({isLogin: true})
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Row  ref="myRef">
            {this.state.isLogin && ( <Redirect to={'/'}/>)}
            <Col xs={9} sm={9} md={9} lg={9} xl={9}></Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6} className="col-login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
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
                    <style>{css}</style>
                </Form>
            </Col>
            <Col xs={9} sm={9} md={9} lg={9} xl={9}></Col>
        </Row>

        );
    }
}
export default Form.create()(LoginPage);

const css = `
body{
    background: url(/images/feature-bg.jpg) no-repeat;;
    padding-top: 150px;
}
.col-login{
    background: rgba(226, 164, 71, 0.7);
    padding-top: 40px;
    border-radius: 5px;
}
.login-form{
    margin: auto;
}
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