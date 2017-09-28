import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import { userSignupRequest } from '../../../actions/userActions';
import {Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button} from 'antd';

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

     handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ loading: true });
        this.props.form.validateFieldsAndScroll((err, values) => {

            if(!err){
                userSignupRequest(values)
                .then(res=>{
                    if(res.data.success){
                        this.goTo('/login')
                    }
                },({response})=>{
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
                            label="E-mail"
                            hasFeedback
                        >
                            {getFieldDecorator('email', {
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
                            label={(
                                <span>
              Name&nbsp;
                                    <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                            )}
                            hasFeedback
                        >
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Please input your name!', whitespace: true}],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                rules: [{
                                    required: true,
                                    message: 'Please make sure you have read and check agreement'
                                }],
                            })(
                                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
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
export default connect(mapStateToProps, {})(WrappedRegistrationForm)
