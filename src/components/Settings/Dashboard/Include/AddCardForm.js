import React, {Component} from 'react'
import {Form,Input,Button,message,Col} from 'antd';
import braintree from 'braintree-web';
import ProtoType from 'prop-types'
import {addCard} from '../../../../actions/paymentActions'

const InputGroup = Input.Group;

const FormItem = Form.Item;


class AddCardForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            loading:false,
            error:[]


        }
    }

    checkCard= (data)=>{

        let {number,card_month,card_year} = data;

        let expirationDate = card_month + '/' + card_year


        return new Promise((resolve,reject) => {
            braintree.client.create({
                authorization: this.props.token
            },  (err, client) => {

                client.request({
                    endpoint: 'payment_methods/credit_cards',
                    method: 'post',
                    data: {
                        creditCard: {
                            number,
                            expirationDate
                        }
                    }
                },  (err, response) => {

                    if(err){
                        reject(err)
                    }
                    resolve(response)
                    // Send response.creditCards[0].nonce to your server
                });
            });

        })


    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, inputs) => {
            if (!err) {

                this.setState({
                    error:[],
                    loading:true
                })
                this.checkCard(inputs).then(res=>{


                    let nounce = res.creditCards[0].nonce

                    addCard(nounce).then(res=>{
                        message.success(res.data.message)
                        this.props.form.resetFields()
                        this.goTo('/settings/payment-credits/card/')

                        this.setState({loading:false})
                    })
                    .catch( error => {
                        this.setState({loading:false})
                        let {response} = error
                        message.error(response.data.message)
                    });

                },err=>{
                    let error = err.details.originalError.fieldErrors[0].fieldErrors
                    this.setState({error, loading:false})
                })

            }
        });
    }





    render() {


        const {getFieldDecorator} = this.props.form;

        let style_wrapper_error = {
            background: '#f9f9f9',
            padding: 20,
            boxShadow: 'rgb(230, 227, 227) 1px 1px 1px',
            border:'1px solid #f3f3f3'}
        let style_error = {
            background:'rgba(206, 17, 38, 0.05)',
            border:'1px solid #ccc',
            textAlign:'center',
            marginBottom: 3
        }

        return (
            <div style={style_wrapper_error}>
                {this.state.error.length > 0 && (
                    <div style={{maxWidth:300,margin:'20px auto'}}>
                        {this.state.error.map(error=>(<div style={style_error}>{error.message}</div>))}
                    </div>
                )}

                <Form
                    style={{maxWidth:300,margin:'auto'}}
                    onSubmit={this.handleSubmit}>


                    <h2 className="head-title">Add New Card</h2>


                        <InputGroup size="large">
                            <Col span={24}>
                                <FormItem
                                    label="Card Number"
                                >
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {required: true, message: 'Please enter card number'},

                                            {min:12, message: 'card number is invalid'},
                                            {max:16, message: 'card number is invalid'},

                                            {
                                                validator: this.checkPassword,
                                            }
                                        ]
                                    })(
                                        <Input placeholder="4242 4242 4242 4242"/>
                                    )}
                                </FormItem>
                            </Col>
                        </InputGroup>


                        <InputGroup size="large">
                            <Col span={12}>

                                <FormItem
                                    label=""
                                >
                                    {getFieldDecorator('card_month', {
                                        rules: [  {required: true, message: 'Please enter this field'}
                                        ]
                                    })(
                                        <Input type="text" placeholder="MM"/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label=""
                                >
                                    {getFieldDecorator('card_year', {
                                        rules: [
                                            {required: true, message: 'Please enter this field'}
                                        ]
                                    })(
                                        <Input type="text" placeholder="YY"/>
                                    )}
                                </FormItem>
                            </Col>
                        </InputGroup>







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
