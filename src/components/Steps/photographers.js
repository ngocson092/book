import '../../stylesheet/_photographer.scss'
import React, {Component} from 'react'
import {Row, Col, Card, Layout, Rate, Icon, Spin, Alert} from 'antd';
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import {NOW} from '../../define'
import {getBookingCornerbookNow, getBookingCornerBookLater, setDataBooking} from '../../actions/bookActions'
import moment from 'moment'
import style from './photographers.css'
const {Header} = Layout;


class Photographer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            loading: false,
            photographers: []
        };
    }

    goTo(route) {
        this.props.history.replace(route)
    }

    handleNext(photographer) {
        let info = {...this.props.bookinfo.info, photographer}
        this.props.setDataBooking({...this.props.bookinfo, info})
        this.goTo('/book/booking-review')

    }

    getPhotographers() {

        let getTimeForBookNow = ()=> {
            const PREPARE_TIME = 15;
            let now = moment().add(PREPARE_TIME, 'minutes'),
                hourAfterAdd = parseInt(now.format('h')),
                newMinute = '00 ';
            if (parseInt(now.format('m')) > 30) {
                hourAfterAdd += 1;
            } else {
                newMinute = '30 ';
            }
            /*
             *  if now : 11:45 PM => 12:30 PM
             *  time for book must be hour:00 or hour:30
             *
             * */

            hourAfterAdd = ('0' + hourAfterAdd).slice(-2)
            // add prefix 0 before number less than 10

            return hourAfterAdd + ':' + newMinute + now.format('A')
        }

        let {duration, date, from, to, photosesh_type_name, photosesh_event_type, place, position} = this.props.bookinfo.info
        let {lat, lng} = position;
        let {book_type} = this.props.bookinfo
        let appointmentEndTime = to;
        let appointmentTime = (book_type == NOW) ? getTimeForBookNow() : from;
        let appointmentDate = (book_type == NOW) ? moment().format('YYYY-MM-DD') : moment(date).format('YYYY-MM-DD');


        let baseForm = {
            address: place,
            agentType: photosesh_type_name,
            eventType: photosesh_event_type.toUpperCase(),
            latitude: lat,
            longitude: lng,
            offset: 420,
        }

        if (book_type == NOW) {
            let form = {...baseForm, appointmentDuration: duration, appointmentTime, appointmentDate}
            return getBookingCornerbookNow(form);

        } else {

            let form = {...baseForm, appointmentTime, appointmentDate, appointmentEndTime}
            return getBookingCornerBookLater(form)

        }
    }

    componentDidMount() {

        this.setState({loading: true})

        this.getPhotographers().then(res=> {

            let photographers = res.data.data
            this.setState({loading: false, photographers})
        }).catch(({response})=> {
            let error = response.data;

            this.setState({message: error.message, loading: false})
        })

    }

    render() {

        return (
            <div className="photosesh-type">
                <ul className="menu_simple">
                    <li>List Photographers</li>
                    |
                    <li><Link to={'/book/need-a-photosesh'}> Back </Link></li>
                    |
                    <li><Link to={'/book/photosesh-type'}>Photosesh Type</Link></li>
                    |
                    <li><Link to={'/book/'}>Select Another address</Link></li>
                </ul>

                <h2 className="head-title-center">
                    List Photographers
                </h2>

                <Row>


                    <Col xs={{span: 24, offset: 0}} sm={{span: 16, offset: 4}} md={{span: 12, offset: 6}}
                         lg={{span: 8, offset: 8}} xl={{span: 8, offset: 8}}
                        >


                        {this.state.loading && (<div style={{textAlign: 'center'}}><Spin/></div>) }


                        {this.state.message != '' && (  <Alert style={{
                            textAlign: 'center',
                            padding: '100px 10px',
                            fontSize: 15
                        }} message={this.state.message} type="info"/>) }

                        { (this.state.photographers.length > 0) && this.state.photographers.map((photo, i) => {
                                return (


                                    <Card bodyStyle={{padding: 0}} onClick={()=>this.handleNext(photo)}  key={i}>
                                        <div className={style.thumbnail}>
                                            <img src={photo.profilePicURL.original} alt=""/>
                                        </div>

                                        <div className={style.right_info}>
                                            <h2>{photo.name}</h2>
                                            <Rate allowHalf defaultValue={photo.rating}/>
                                            <h3>{(new Date(photo.startingDate)).toLocaleDateString('en-US')}
                                                at {photo.startingTime}</h3>

                                            <h2>${photo.agentPrice}/hr</h2>
                                            <h3>13 min away</h3>
                                        </div>
                                    </Card>

                                )
                            })
                        }
                    </Col>
                </Row>

            </div>
        )


    }

}

const mapStateToProps = (state)=> {
    return {
        bookinfo: state.bookinfo
    }
}

export default connect(mapStateToProps, {setDataBooking})(Photographer)