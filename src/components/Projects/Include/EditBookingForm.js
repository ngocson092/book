/**
 * Created by lamtanphiho on 10/12/2017.
 */
import React,{Component} from 'react'
import {Form,Input,Button,Upload,message,Icon,Spin,Card} from 'antd';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

const FormItem = Form.Item;

class EditBookingForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            booking: {}
        };

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        console.log(this.state.booking)
        return (
            <div>
                <Form style={{maxWidth:1000}}>
                    <Card>

                        <FormItem
                            label="Book Date"
                            hasFeedback
                        >
                            {getFieldDecorator('bookDate', {
                                rules: [{
                                    required: true, message: 'Book date is not empty',
                                },
                                ],
                                initialValue: dateFormat(this.props.booking.appointmentDate, 'yyyy-mm-dd')
                            })(
                                <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Start Time"
                            hasFeedback
                        >
                            {getFieldDecorator('starttime', {
                                rules: [{
                                    required: true, message: 'Start Time is not empty',
                                },
                                ],
                                initialValue: this.props.booking.appointmentStartTime
                            })(
                                <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="End Time"
                            hasFeedback
                        >
                            {getFieldDecorator('endtime', {
                                rules: [{
                                    required: true, message: 'End Time is not empty',
                                },
                                ],
                                initialValue: this.props.booking.appointmentStartTime
                            })(
                                <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Book address"
                            hasFeedback
                        >
                            {getFieldDecorator('bookaddress', {
                                rules: [{
                                    required: true, message: 'Book address is not empty',
                                },
                                ],
                                initialValue: this.props.booking.appointmentAddress
                            })(
                                <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Title"
                            hasFeedback
                        >
                            <p style={{
                                padding: '0 10px',
                                background: " rgb(239, 239, 239)",
                                marginBottom: 10,
                                borderRadius: 3,
                                border: '1px solid #dcd6d6'
                            }}>{this.props.booking.titleOrDescription}</p>
                        </FormItem>
                        <FormItem
                            label="Agent name"
                            hasFeedback
                        >
                            <p style={{
                                padding: '0 10px',
                                background: " rgb(239, 239, 239)",
                                marginBottom: 10,
                                borderRadius: 3,
                                border: '1px solid #dcd6d6'
                            }}> {this.props.booking.agentName.firstName + ' ' + this.props.booking.agentName.lastName}</p>
                        </FormItem>
                        <FormItem
                            label="Agent email"
                            hasFeedback
                        >
                            <p style={{
                                padding: '0 10px',
                                background: " rgb(239, 239, 239)",
                                marginBottom: 10,
                                borderRadius: 3,
                                border: '1px solid #dcd6d6'
                            }}> {this.props.booking.agentEmailId}</p>
                        </FormItem>
                        <FormItem
                            label="Status"
                            hasFeedback
                        >
                            <p style={{
                                padding: '0 10px',
                                background: " rgb(239, 239, 239)",
                                marginBottom: 10,
                                borderRadius: 3,
                                border: '1px solid #dcd6d6'
                            }}> {this.props.booking.appointmentStatus}</p>
                        </FormItem>
                    </Card>

                </Form>
                <style>{css}</style>
            </div>
        )
    }

}
EditBookingForm.propTypes = {
    booking: PropTypes.object.isRequired,
}

const css = `
.ant-row.ant-form-item {
    width: 45%;
    float: left;
    margin: 20px;
}
`;
export default Form.create()(EditBookingForm);

