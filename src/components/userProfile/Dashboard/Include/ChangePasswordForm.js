import React, {Component} from 'react'
import {Form,Input,Button,message} from 'antd';
import {changePassword} from '../../../../actions/userActions'


const FormItem = Form.Item;
class ChangePasswordForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            confirmDirty: false,
            user: {},
            loading:false,

        }
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    
    handleChangePassword = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, inputs) => {
            if (!err) {
                this.setState({
                    loading:true
                })

                changePassword(inputs)
                    .then(res=>{


                        this.props.form.resetFields()

                        message.success('Change Password Successful')

                        this.setState({ loading: false });
                    },({response})=>{

                        message.error('Password is Invalid Credentials')

                        this.setState({ loading: false });
                    })
            }
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form style={{maxWidth:500,marginTop:30}} onSubmit={this.handleChangePassword}>

                <FormItem
                    label="Old Password"
                    hasFeedback
                >
                    {getFieldDecorator('old_password', {
                        rules: [{
                            required: true, message: 'Please input old password ',
                        }
                        ]
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>

                <FormItem
                    label="New Password"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input New password ',
                        }
                        ]
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
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

                <Button
                    type="primary"
                    htmlType="submit"

                    icon="save"
                    loading={this.state.loading}
                >
                    Change Password
                </Button>


            </Form>
        )
    }
}
export default Form.create()(ChangePasswordForm);
