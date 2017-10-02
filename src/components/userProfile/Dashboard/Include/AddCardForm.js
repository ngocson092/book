import React, {Component} from 'react'
import {Form,Input,Button,message,Col} from 'antd';
const InputGroup = Input.Group;

const FormItem = Form.Item;


class AddCardForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            loading:false


        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, inputs) => {
            if (!err) {
                this.setState({
                    loading:true
                })

            }
        });
    }





    render() {


        const {getFieldDecorator} = this.props.form;
        return (
            <Form
                style={{
                maxWidth: 500,
                margin: 'auto',
                background: 'white',
                padding: 20,
                boxShadow: '1px 1px 1px #c5c5c5'}}
                onSubmit={this.handleSubmit}>

                <h2 className="head-title">Add New Card</h2>

                <FormItem
                    label="Card Number"
                    hasFeedback
                >
                    {getFieldDecorator('card_number', {
                        rules: [{
                            required: true, message: 'Please enter your card number',
                        },
                        ],
                        initialValue: ''
                    })(
                        <Input placeholder=""/>
                    )}


                </FormItem>
                <FormItem
                    label=""
                    hasFeedback
                >
                    <InputGroup size="large">
                        <Col span={4}>

                            {getFieldDecorator('card_month', {
                                rules: [{
                                    required: true, message: '',
                                },
                                ],
                                initialValue: ''
                            })(
                                <Input placeholder="MM"/>
                            )}

                        </Col>
                        <Col span={4}>

                            {getFieldDecorator('card_year', {
                                rules: [{
                                    required: true, message: '',
                                },
                                ],
                                initialValue: ''
                            })(
                                <Input placeholder="YY"/>
                            )}
                        </Col>
                    </InputGroup>


                </FormItem>


                <Button
                    type="primary"
                    htmlType="submit"

                    icon="save"
                    loading={this.state.loading}
                >
                    Add Card
                </Button>


            </Form>
        )
    }
}


export default Form.create()(AddCardForm);
