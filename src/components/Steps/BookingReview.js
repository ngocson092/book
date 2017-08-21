/**
 * Created by lamtanphiho on 8/22/2017.
 */

import '../../stylesheet/_photographer.scss'
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon, Rate} from 'antd';
import {connect} from 'react-redux'
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

        let content =  (
            <table>
                <tr>
                    <th>Title/Description</th>
                    <td>abc</td>
                </tr>
                <tr>
                    <th>Event Type</th>
                    <td>{booknow.info.eventType}</td>
                </tr>
                <tr>
                    <th>Photographer Type</th>
                    <td>{booknow.info.photoseshType}</td>
                </tr>
                <tr>
                    <th>Service Location</th>
                    <td>{booknow.place}</td>
                </tr>
                <tr>
                    <th>Scheduled For</th>
                    <td>{
                        dateFormat(booknow.info.date, "mmm d, yyyy")}</td>
                </tr>
            </table>
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
                <div className="container">
                    <h2 className="title">Booking Review</h2>

                    {this.state.content}
                </div>

            </div>
        )
    }

}

export default BookingReview