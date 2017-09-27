import React, {Component} from 'react';
import {Row, Col, Form, Icon, Input, Button, Checkbox,message} from 'antd';
import {connect} from 'react-redux'
import {login,setToken} from '../../actions/authActions'

const FormItem = Form.Item;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }
    handleSubmit = (e) => {
        e.preventDefault();


        this.props.form.validateFields((err, values) => {
            if (!err) {

                login({
                    emailId: values.email,
                    password: values.password,
                    deviceType: "IOS",
                    deviceToken: "1"
                })
                .then( (response) =>{

                    let data = response.data.data;

                    let {name ,location ,phoneNumber ,emailId} = data;
                    let user = {name ,location ,phone:phoneNumber ,email:emailId};

                    this.props.setToken(data.accessToken,user)
                    message.success('Login successful.');
                    this.goTo('/')

                })
                .catch( error => {
                      console.log(error);
                    let {response} = error
                    message.error(response.data.message)

                });


            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row>
                <Col xs={{span: 24, offset: 0}}
                     sm={{span: 8, offset: 8}}
                     md={{span: 8, offset: 8}}
                     lg={{span: 8, offset: 8}}
                     xl={{span: 8, offset: 8}} className="col-login">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: 'Please input your Email!'},
                                    {type: 'email', message: 'The input is not valid E-mail!'}

                                ],
                            })(
                                <Input prefix={<Icon type="user"/>} placeholder="Email"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input style={{fontSize: 13}} prefix={<Icon type="lock"/>} type="password"
                                       placeholder="Password"/>
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

            </Row>

        );
    }
}


const WrappedLoginForm = Form.create()(LoginPage);

const mapStateToProps = (state) => {
    return {
        isAuthenticated:state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, {setToken})(WrappedLoginForm)




const css = `
input.ant-input{
    font-size:15px;
}
body{
    padding-top: 150px;
}
.col-login{
    padding-top: 40px;
    border-radius: 5px;
}
.ant-modal.modal-login {
    width: 330px !important;
}
.login-form { 
    margin: auto;
    max-width: 350px;
    padding: 30px 20px;
    background: #fbfbfb;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #ddd;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}`;