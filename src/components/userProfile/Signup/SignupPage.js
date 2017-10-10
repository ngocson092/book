import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { userSignupRequest } from '../../../actions/userActions';
import { login,setToken,filterUserData } from '../../../actions/authActions';
import {Form, Input, Row, Col, message, Button} from 'antd';

import style from './signup.css';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    state = {
        confirmDirty: false,
        errors:[],
        loading: false,
        iconLoading: false,
    };

    login = (data)=>{

        login(data).then(response => {

            this.setState({loading:false})

            let data = response.data.data;
            let user = filterUserData(data);


            this.props.setToken(data.accessToken,user)
            this.goTo('/')
            message.success(response.data.message)
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();


        this.props.form.validateFieldsAndScroll((err, values) => {

            if(!err){
                this.setState({ loading: true });
                let data = {...values,deviceType:'IOS',deviceToken:'1'};
                delete data.confirm

                let form_data = new FormData();

                console.log(data);
                Object.keys(data).forEach((key)=>{
                    form_data.append(key,data[key]);
                })



                userSignupRequest(form_data)
                .then(res=>{
                    if(res.data.statusCode == 201){

                        let {password,emailId} = data

                        this.login({password,emailId,deviceType: "IOS",deviceToken: "1"})
                    }
                },({response})=>{


                    message.error(response.data.message)
                    this.setState({ loading: false });
                })
            }


        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };


        return (


            <Row>
                <Col
                    xs={{span: 24, offset: 0}}
                    sm={{span: 16, offset: 4}}
                    md={{span: 16, offset: 4}}
                    lg={{span: 16, offset: 4}}
                    xl={{span: 16, offset: 4}}
                >

                    <Form className={style.signup_form} onSubmit={this.handleSubmit}>


                        <h2>Signup <span>Account</span> </h2>


                        {this.state.errors.map(error=>(<div>{error.message}</div>))}

                        <FormItem
                            {...formItemLayout}
                            label="First Name"
                            hasFeedback
                        >
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your First Name!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Last Name"
                            hasFeedback
                        >
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your Last Name!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label="E-mail"
                            hasFeedback
                        >
                            {getFieldDecorator('emailId', {
                                rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                }, {
                                    required: true, message: 'Please input your E-mail!',
                                },
                                {
                                    validator: this.handleCheckUserExists,
                                    message:'this email already exist'
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label="Phone"
                            hasFeedback
                        >
                            {getFieldDecorator('phoneNumber', {
                                rules: [{ required: true, message: 'Please input your phone!'}],
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Password"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Referral Code"
                            hasFeedback
                        >
                            {getFieldDecorator('referralCode', {
                                rules: [],
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Enterprise Code"
                            hasFeedback
                        >
                            {getFieldDecorator('enterpriseCode', {
                                rules: [],
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </FormItem>



                        <FormItem {...tailFormItemLayout}>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    </Form>

                    <ul className={style.footer}>
                        <li><Link to="/">Login</Link></li>
                        |
                        <li><Link to="/">Term</Link></li>
                        |
                        <li><Link to="/">About us</Link></li>
                    </ul>


                </Col>
            </Row>


        );
    }
}




const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, {setToken})(WrappedRegistrationForm)
