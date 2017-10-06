/**
 * Created by lamtanphiho on 8/13/2017.
 */
import '../../stylesheet/_photographer.scss'
import React, {Component} from 'react'
import {Row, Col, Card, Layout, Button, Icon, Rate} from 'antd';
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'

import {bookNow} from '../../actions/bookActions'

const {Header} = Layout;


class Photographer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    handleNext(photographer) {
        this.props.setPhotographer(photographer)
    }

    componentDidMount() {

        let {duration, date, from, photosesh_type_name, photosesh_event_type, photographer, place, position} = this.props.bookinfo.info
        let {lat, lng} = position

        const form = {
            agentType: uri photosesh_type_name,
            appointmentDuration: uri duration,
            appointmentTime: uri from,
            eventType: uri photosesh_event_type,
            latitude: uri lat,
            longitude: uri lng,
            offset: uri 42,
            appointmentDate: uri date,
        }

        this.props.bookNow(form).then(res=> {
            console.log(res.data);
        })


    }









    co1mponentDidMount = function () {
        /*const self = this;
         let booknow = localStorage.getItem("booknow");
         booknow = JSON.parse(booknow);

         let user =  localStorage.getItem("user");
         user = JSON.parse(user);



         request.get(process.env.API_URL+'/bookingCorner/user/photoSeshNow?'+qs.stringify(form), {
         headers: {
         'authorization': user.accessToken
         }
         },
         function (error, response, body) {
         let content;
         if(!error ) {
         body = JSON.parse(body);console.log(body)
         if (body.statusCode == 200) {

         content = body.data.map((photo, i) => {
         return (

         <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}>
         <Link to={'/book-now/booking-review'} onClick={()=>self.handleNext(photo)}>
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

         }
         if (!error && body.statusCode == 400) {
         content = (<Col xs={24} sm={24} md={24} lg={24} xl={24}>
         <Card bodyStyle={{padding: 0}}>
         <div className="custom-card-photographer-center">
         <h2>{body.message}</h2>
         </div>
         </Card>
         </Col>);
         }
         self.setState({content: content});
         }
         });*/
    }

    render() {

        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/book-now'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/need-a-photosesh'}><Icon type="left"/> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">Photographers</h2>

                    <Row>

                    </Row>
                </div>

            </div>
        )


    }

}
const mapStateToProps = (state)=> {

    return {
        bookinfo: state.bookinfo
    }

}
export default connect(mapStateToProps, {bookNow})(Photographer)