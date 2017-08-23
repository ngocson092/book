/**
 * Created by lamtanphiho on 8/22/2017.
 */

import '../../stylesheet/_booking_review.scss'
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon, Rate, Input, Form, Modal} from 'antd';
import {Route,Link} from 'react-router-dom'
const {Header} = Layout;
const dateFormat = require('dateformat');
const booking = require('../../controllers/booking');

class BookingReview extends Component{
    constructor(props) {
        super(props);
        let user =  localStorage.getItem("user");
        user = JSON.parse(user);
        this.state = {
            content : '',
            title   : '',
            user : user
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({title: event.target.value});
        console.log(this.state.value)
    }
    onSubmit= function (e) {
        e.preventDefault();
    }
    handleNext = function () {
        if(this.state.title == '')
            warning();
        else {
            let booknow = localStorage.getItem("booknow");
            booknow = JSON.parse(booknow);
            booknow.info.title = this.state.title;console.log(booknow)

            booking.postBooking(this.state.user, booknow).then(result => {
                console.log(result);
                result = JSON.parse(result);
                success(result.message)
            })
        }
    }

    render() {
        let booknow = localStorage.getItem("booknow");
        booknow = JSON.parse(booknow);
        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/book-now'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/photographers'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container book-review">
                    <h2 className="title">Booking Review</h2>
                    <Form layout="vertical" onSubmit={this.onSubmit}>
                        <Row>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <Row className="book-info-row">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <label className="book-info-title">Title/Description</label>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Input onChange={this.handleChange}
                                               placeholder="Enter title" value={this.state.title}
                                        />
                                    </Col>
                                </Row>
                                <Row className="book-info-row">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <label className="book-info-title">Event Type</label>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {booknow.info.eventType}
                                    </Col>
                                </Row>
                                <Row className="book-info-row">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <label className="book-info-title">Photographer Type</label>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {booknow.info.photoseshType}
                                    </Col>
                                </Row>
                                <Row className="book-info-row">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <label className="book-info-title">Service Location</label>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {booknow.place}
                                    </Col>
                                </Row>
                                <Row className="book-info-row">
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <label className="book-info-title">Scheduled For</label>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                        {dateFormat(booknow.info.date, "mmm d, yyyy")}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="border-bot">
                                        <Card bodyStyle={{padding: 0}}>
                                            <div className="custom-card-booking-review">
                                                <label className="book-info-title">Photographers Requested</label><br/><br/>
                                                <label>{booknow.info.photographer.name}</label><br/>
                                                <Rate allowHalf defaultValue={booknow.info.photographer.rating}/>

                                            </div>
                                            <div className="custom-card-booking-review-right">
                                                <br/><br/><label>${booknow.info.photographer.agentPrice}/hr</label> <br/><br/>
                                                <label> {dateFormat(booknow.info.date, "mmm d, yyyy")}
                                                    at {booknow.info.photographer.startingTime}</label>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="btn-submit">
                                        <Button type="primary" onClick={this.handleNext.bind(this)}>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }

}

export default BookingReview

const warning = function() {
    Modal.warning({
        title: 'Missing Title',
        content: 'Please type a title...',
    });
}

const success = function(content) {
    Modal.success({
        title: 'Process success !',
        content: content,
    });
}