/**
 * Created by lamtanphiho on 8/22/2017.
 */

import '../../stylesheet/_booking_review.scss'
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon, Rate} from 'antd';
import {Route,Link} from 'react-router-dom'
const {Header} = Layout;
const dateFormat = require('dateformat');

class BookingReview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content : ''
        };
    }
    componentDidMount = function () {
        const self = this;
        let booknow = localStorage.getItem("booknow");
        booknow = JSON.parse(booknow);
        console.log(booknow)
        let content =  (
            <Row>
                <Col xs={8} sm={8} md={8} lg={8} xl={8}></Col>
                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Row className="book-info-row">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <label className="book-info-title">Title/Description</label>
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
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card bodyStyle={{padding: 0}}>
                                <div className="custom-card-photographer">
                                    <h2>{booknow.info.photographer.name}</h2>
                                    <Rate allowHalf defaultValue={booknow.info.photographer.rating}/>
                                    <h3>{(new Date(booknow.info.photographer.startingDate)).toLocaleDateString('en-US')}
                                        at {booknow.info.photographer.startingTime}</h3>
                                </div>
                                <div className="custom-card-photographer-right">
                                    <h2>${booknow.info.photographer.agentPrice}/hr</h2>
                                    <h3>13 min away</h3>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col xs={7} sm={7} md={7} lg={7} xl={7}></Col>
            </Row>
        )
        self.setState({content: content});
    }
    render() {
        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/photographers'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container book-review">
                    <h2 className="title">Booking Review</h2>

                    {this.state.content}
                </div>
            </div>
        )
    }

}

export default BookingReview

