import style  from  './book.css'
import React, {Component} from 'react'
import moment from 'moment'
import {Row, Col, Card, Alert, Button, Icon, Rate, Input, Form, Modal,Checkbox} from 'antd';
import {Route, Link} from 'react-router-dom'
import {NOW} from '../../define'
import {postBooking} from '../../actions/bookActions'
import {connect} from 'react-redux'
import {getCards,setCardDefault} from '../../actions/paymentActions'
import {cleanSlug} from '../../utils/helper'
import SelectCard from './Include/SelectCard'
const FormItem = Form.Item;
class BookingReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            has_card_default: true,
            visibleModalCard:false,
            checked_set_card_default:false
        };
    }



    popupSelectCard = (e) => {
        e.preventDefault();

        this.setState({visibleModalCard:true})
    }

    hideModal = (e) => {
        e.preventDefault();

        this.setState({visibleModalCard:false})

    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {


                if(this.state.checked_set_card_default){

                    if(this.props.payment.cards.filter(card=>(card._id == this.props.card_booking._id) && card.isDefault ).length == 0 )
                    {
                        this.props.setCardDefault(this.props.card_booking._id)
                    }
                }

                let {title} = values;

                let form = {
                    address: this.props.bookinfo.info.place,
                    agentIds: [this.props.bookinfo.info.photographer._id],
                    appointmentDate: this.props.bookinfo.info.date,
                    appointmentTime: this.props.bookinfo.info.from,
                    appointmentEndTime: this.props.bookinfo.info.to,
                    agentType: this.props.bookinfo.info.photosesh_type_name,
                    eventType: this.props.bookinfo.info.photosesh_event_type,
                    longitude: this.props.bookinfo.info.position.lng,
                    latitude: this.props.bookinfo.info.position.lat,
                    photoSeshNow: (this.props.bookinfo.book_type == NOW) ? true : false,
                    offset: 420,
                    isReschedule: false,
                    appointmentDuration: this.props.bookinfo.info.duration,
                    previousBookingId: '',
                    paymentCardId: this.props.payment.defaultCardId,
                    titleOrDescription: title
                }

                this.setState({loading: true})
                postBooking(form).then(res=> {
                    let data = res.data.data
                    if (res.status == 200) {
                        let message = data.message
                    }
                })
            }


        })
    }

    componentWillMount() {
        this.props.getCards()

    }


    render() {
        const {bookinfo} = this.props
        const {getFieldDecorator} = this.props.form;

        const Title = (this.props.bookinfo.book_type == NOW) ? "Book Now" : "Book Later"


        return (
            <div className={style['full-height']} style={{paddingTop: 30}}>
                <div className="book-review">

                    <Row className={style.row}>

                        <Col xs={{span: 24, offset: 0}}
                             sm={{span: 16, offset: 4}}
                             md={{span: 12, offset: 6}}
                             lg={{span: 10, offset: 7}}
                             xl={{span: 8, offset: 9}}>
                            <Card className={style['ant-card']}>
                                <h2 className={style['title']}>Booking Review</h2>
                                <Form onSubmit={this.handleSubmit}>
                                    <Row className={style.row}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <label className={style['book-info-title']}>Title/Description</label>
                                            <FormItem>
                                                {getFieldDecorator('title', {
                                                    rules: [
                                                        {required: true, message: 'Please enter title'}
                                                    ],
                                                })(
                                                    <Input prefix={<Icon type="user"/>} placeholder="Title"/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>

                                    <Row className={style.row}>
                                        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                            <label className="book-info-title">Event Type</label>
                                        </Col>

                                        <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                                            <h2 className="title-medium">{cleanSlug(bookinfo.info.photosesh_event_type)}</h2>
                                        </Col>
                                    </Row>


                                    <Row className={style.row}>
                                        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                            <label className="book-info-title">Photographer Type</label>
                                        </Col>
                                        <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                                            <h2 className="title-medium">
                                                {cleanSlug(bookinfo.info.photosesh_type_name)}
                                            </h2>
                                        </Col>
                                    </Row>


                                    <Row className={style.row}>
                                        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                            <label className="book-info-title">Service Location</label>
                                        </Col>
                                        <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                                            {bookinfo.info.place}
                                        </Col>
                                    </Row>


                                    <Row className={style.row}>
                                        <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                                            <label className="book-info-title">Scheduled For</label>
                                        </Col>
                                        <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                                            {moment(bookinfo.info.date).format("MM - DD - YYYY")}
                                        </Col>
                                    </Row>


                                    <Row className={style.row}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={style.footer}>

                                            <h4 className="book-info-title">Photographers Requested : </h4>

                                            <div style={{width: '100%', overflow: 'hidden'}}>
                                                <span style={{float: 'left'}}>{bookinfo.info.photographer.name}</span>
                                                <span style={{float: 'right'}}>${bookinfo.info.photographer.agentPrice}/hr</span>
                                            </div>
                                            <div className={style['custom-card-booking-review']}>
                                                <Rate style={{float: 'left'}} allowHalf
                                                      defaultValue={bookinfo.info.photographer.rating}/>
                                                <span
                                                    style={{float: 'right'}}> {moment(bookinfo.info.date).format("MMMM Do YYYY ")}
                                                    at {bookinfo.info.photographer.startingTime}</span>
                                            </div>

                                        </Col>
                                    </Row>


                                    {this.props.has_card && (
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <div style={{
                                                    padding: '20px 10px',
                                                    background: '#cecece',
                                                    textAlign: 'center',
                                                    fontSize: 18,
                                                    color: '#444140',
                                                    border: '1px solid #84878a',

                                                }}>Card : ************ { this.props.card_booking.lastFourDigits}
                                                    ({ this.props.card_booking.cardType})
                                                </div>

                                                <div>

                                                    <Checkbox onChange={(e)=>{ this.setState({checked_set_card_default:e.target.checked});}} defaultChecked={false}>Set Card Default</Checkbox>
                                                </div>
                                            </Col>
                                        </Row>
                                    )}


                                    <Row className={style.row}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                                            <Button
                                                style={{
                                                    background: 'none',
                                                    color: '#4b4b4b'
                                                }}
                                                onClick={this.popupSelectCard} className={'btn-submit'}
                                                    type="primary">
                                                Select Another Card
                                            </Button>

                                            <br/>

                                            <Button disabled={!this.props.has_card} loading={this.state.loading}
                                                    htmlType="submit" className={'btn-submit'} type="primary">
                                                Book Photosesh
                                            </Button>

                                        </Col>
                                    </Row>

                                </Form>
                            </Card>


                            <Modal
                                title="Select Card"
                                visible={this.state.visibleModalCard}
                                onOk={this.hideModal}
                                onCancel={this.hideModal}
                                width={900}
                                footer={( <div style={{overflow:'hidden'}}> <Button style={{float:'left'}} onClick={()=>{this.setState({visibleModalCard:false})}} type={'primary'}> Done </Button> </div>)}
                            >
                                <SelectCard cardBooking={this.props.card_booking} cards={this.props.payment.cards} />
                            </Modal>

                            <ul className="menu_simple">
                                <li>Booking review</li>
                                |
                                <li><Link to={'/book/photographers'}>Photographers </Link></li>
                                |
                                <li><Link to={'/book/'}>Pick Another Address </Link></li>
                                |
                                <li><Link to={'/'}>Home Page</Link></li>
                            </ul>
                        </Col>

                    </Row>

                </div>
            </div>
        )
    }

}
const mapStateToProps = (state)=> {
    return {
        bookinfo: state.bookinfo,
        payment: state.payment,
        has_card: state.payment.cards.length > 0,
        card_booking: state.payment.card_booking
    }
}
const WrappedBookingReview = Form.create()(BookingReview);
export default connect(mapStateToProps, {getCards,setCardDefault})(WrappedBookingReview)
