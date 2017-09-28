import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Form, Icon, Input, Button, Checkbox,message} from 'antd';
import {connect} from 'react-redux'
import {login,setToken} from '../../../actions/authActions'
import style from './login.css'


const FormItem = Form.Item;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            loading:false
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }
    handleSubmit = (e) => {
        e.preventDefault();


        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.setState({loading:true})

                login({
                    emailId: values.email,
                    password: values.password,
                    deviceType: "IOS",
                    deviceToken: "1"
                })
                .then( (response) =>{
                    this.setState({loading:false})
                    let data = response.data.data;

                    let {name ,location ,phoneNumber ,emailId} = data;
                    let user = {name ,location ,phone:phoneNumber ,email:emailId};

                    this.props.setToken(data.accessToken,user)
                    message.success('Login successful.');
                    this.goTo('/')

                })
                .catch( error => {
                    this.setState({loading:false})
                    let {response} = error
                    message.error(response.data.message)
                });
            }
        });
    }


    componentWillMount(){
        if (localStorage.access_token) {
            this.goTo('/')
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row>
                <Col xs={{span: 24, offset: 0}}
                     sm={{span: 16, offset: 4}}
                     md={{span: 8, offset: 8}}
                     lg={{span: 8, offset: 8}}
                     xl={{span: 8, offset: 8}} className="col-login">


                    <Form onSubmit={this.handleSubmit} className={style.login_form}>
                        <h2><span>Photosesh</span> Login</h2>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [
                                    {required: true, message: 'Please input your Email!'},
                                    {type: 'email', message: 'The input is not valid E-mail!'}

                                ],
                            })(
                                <Input className={style.input} prefix={<Icon type="user"/>} placeholder="Email"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input  className={style.input} prefix={<Icon type="lock"/>} type="password"
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
                            <Button type="primary" loading={this.state.loading} htmlType="submit" className={style.button}>
                                Log in
                            </Button>

                        </FormItem>
                    </Form>
                    <ul className={style.footer}>
                        <li><Link to="/signup">Create Account</Link></li>
                        |
                        <li><Link to="/">Forgot password</Link></li>
                    </ul>
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



