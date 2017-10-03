import React, {Component} from 'react'
import {Form,Input,Button,message,Col} from 'antd';
import braintree from 'braintree-web';
import ProtoType from 'prop-types'
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

    checkCard= (data)=>{

        let {number,card_month,card_year} = data;

        let expirationDate = card_month + '/' + card_year

        console.log(this.props.token,expirationDate,number);

        braintree.client.create({
            authorization: this.props.token
        }, function (err, client) {

            client.request({
                endpoint: 'payment_methods/credit_cards',
                method: 'post',
                data: {
                    creditCard: {
                        number,
                        expirationDate
                    }
                }
            }, function (err, response) {
                // Send response.creditCards[0].nonce to your server
            });
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, inputs) => {
            if (!err) {

                this.checkCard(inputs)

                this.setState({
                    loading:true
                })

            }
        });
    }





    render() {


        const {getFieldDecorator} = this.props.form;

        return (
            <div style={{
                background: '#f9f9f9',
                padding: 20,
                boxShadow: 'rgb(230, 227, 227) 1px 1px 1px',
                border:'1px solid #f3f3f3'}}>

                <Form
                    style={{maxWidth:300,margin:'auto'}}
                    onSubmit={this.handleSubmit}>

                    <h2 className="head-title">Add New Card</h2>

                    <FormItem
                        label="Card Number"
                        hasFeedback
                    >
                        {getFieldDecorator('number', {
                            rules: [{
                                required: true, message: 'Please enter your card number',
                            },
                                {min: 16, message: ''},
                                {max: 16, message: ''},
                            ],
                            initialValue: ''
                        })(
                            <Input placeholder="4242 4242 4242 4242"/>
                        )}


                    </FormItem>
                    <FormItem
                        label=""
                        hasFeedback
                    >
                        <InputGroup size="large">
                            <Col span={10}>

                                {getFieldDecorator('card_month', {
                                    rules: [  {required: true, message: ''},
                                        {min: 2, message: 'Invalid Month'},
                                    ],
                                    initialValue: ''
                                })(
                                    <Input type="number" placeholder="MM"/>
                                )}

                            </Col>
                            <Col span={10}>

                                {getFieldDecorator('card_year', {
                                    rules: [
                                        {required: true, message: ''},
                                        {min: 2, message: 'Invalid Year'},
                                    ],
                                    initialValue: ''
                                })(
                                    <Input type="number" placeholder="YY"/>
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

            </div>

        )
    }
}


AddCardForm.protoType = {
    token:ProtoType.string.isRequired
}

export default Form.create()(AddCardForm);
