/**
 * Created by lamtanphiho on 8/13/2017.
 */
import '../../stylesheet/_photographer.scss'
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon, Rate} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
const {Header} = Layout;
const request   = require('request');
const qs        = require('querystring')

class PhotoseshType extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content : ''
        };
    }
    componentDidMount = function () {
        let self = this;
        const form = {
            address     : "Newark, New Jersey, Hoa Kỳ",
            agentType    : "PhotoSesh",
            appointmentDuration    : 5,
            appointmentTime    : "11:30 PM",
            eventType    : "CASUAL_EVENTS",
            latitude    : 30.7188105741499,
            longitude    : 76.8101991653969,
            offset    : 42,
            osVersion    : "10.3.3",
            appVersion  : 102,
            appointmentDate : "2017-08-18"
        }
        let user =  localStorage.getItem("user");
        user = JSON.parse(user);console.log(user)
            request.get(process.env.API_URL+'/bookingCorner/user/photoSeshNow?'+qs.stringify(form), {
                headers: {
                    'authorization': user.accessToken
                }
            },
            function (error, response, body) {
                if(!error) {
                    body = JSON.parse(body);
                    let content = body.data.map((photo, i) => {
                        return (
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}>
                                <Link to={'/book-now/photographers'}>
                                    <Card bodyStyle={{padding: 0}}>
                                        <div className="custom-image-photographer">
                                            <img src={photo.profilePicURL.original} alt=""/>
                                        </div>
                                        <div className="custom-card-photographer">
                                            <h2>{photo.name}</h2>
                                            <Rate allowHalf defaultValue={photo.rating}/>
                                            <h3>{(new Date(photo.startingDate)).toLocaleDateString('en-US')}
                                                at {photo.startingTime}</h3>
                                        </div>
                                        <div className="custom-card-photographer-right">
                                            <h2>${photo.agentPrice}/hr</h2>
                                            <h3>13 min away</h3>
                                        </div>
                                    </Card>
                                </Link>

                            </Col>
                        )
                    })
                    self.setState({content: content});
                }
                else console.log(error)
            });
    }

    render() {

        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/photosesh-type/detail-light'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">Photographers</h2>

                    <Row>
                        {this.state.content}
                    </Row>
                </div>

            </div>
        )


    }

}

export default PhotoseshType