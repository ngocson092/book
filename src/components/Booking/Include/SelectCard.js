import React, {Component} from 'react'
import {Form,Input,Button,message,Col,Row,Alert,Radio,Modal} from 'antd';
import braintree from 'braintree-web';
import {addCard,getPaymentToken,setCardBooking,getCards} from '../../../actions/paymentActions'
import {connect} from 'react-redux';
import ProtoType from 'prop-types'
const InputGroup = Input.Group;

const FormItem = Form.Item;
class SelectCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            loading:false,
            error:[],
            nounce:null
        }
    }


    checkCard= (data)=>{

        let {number,card_month,card_year} = data;
        let expirationDate = card_month + '/' + card_year
        
        return new Promise((resolve,reject) => {
            braintree.client.create({
                authorization: this.state.nounce
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
    
    componentWillMount(){
        getPaymentToken()
            .then(res=>{
                this.setState({
                    nounce:res.data.data
                })
            })
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
                        this.props.getCards()
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



    onChangeCardBooking = (e)=>{

        let card_id = e.target.value || ''
        if(card_id != ''){
           this.props.setCardBooking(this.props.cards.filter(card=>card._id == card_id).pop())
        }

    }



    render() {


        const {getFieldDecorator} = this.props.form;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }
        const RadioGroup = Radio.Group;
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

            <Row>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                    {this.props.cards.length == 0  && ( <Alert message="You have not added any cards yet. " type="info"/> )}

                    {this.props.cards.length > 0 && (


                        <div>
                            <RadioGroup onChange={this.onChangeCardBooking} value={this.props.cardBooking._id}>
                                {this.props.cards.map(card=>{
                                    return  (<Radio key={card._id} style={radioStyle} value={card._id}> ************ {card.lastFourDigits} - ({ card.cardType}) </Radio>)
                                })}
                            </RadioGroup>
                        </div>

                    )}
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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

                </Col>
            </Row>


        )
    }
}


SelectCard.protoType = {
    cards:ProtoType.array.isRequired,
    cardBooking:ProtoType.object.isRequired,
}

const mapStateToProps = (state)=> {
    return {
    }
}
const WrappedSelectCard = Form.create()(SelectCard);
export default connect(mapStateToProps, {setCardBooking,getCards})(WrappedSelectCard)
