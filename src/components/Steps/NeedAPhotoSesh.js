/**
 * Created by lamtanphiho on 8/9/2017.
 */
import '../../stylesheet/_needaphotosesh.scss'
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'

import {setDataBooking} from '../../actions/bookActions'
const {Header} = Layout;

class NeedPhotosesh extends Component{
    constructor(props) {
        super(props);
    }
    handleNext (photosesh_event_type) {

        let new_book_data = {...this.props.bookinfo}
        new_book_data.info.photosesh_event_type = photosesh_event_type
        this.props.setDataBooking(new_book_data)

    }

    render() {
        return (
            <div className="photosesh-type needphotosesh">
                <Header id="header">
                    <Link className="logo" to={'/book-now'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/photosesh-type/detail'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">I Need a PhotoSesh For ...</h2>

                    <Row>
                        {this.props.EventList.map((event, i) => {
                            const img = "/images/"+ ++i +".jpg";
                            return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}>
                                    <Link to={"/book-now/photographers"}  onClick={()=>this.handleNext(event.eventName)}>
                                        <Card bodyStyle={{padding: 0}}>
                                            <div className="custom-image">
                                                <img src={event.eventImage.thumb} alt=""/>
                                            </div>
                                            <div className="custom-card">
                                                <h2>{event.eventName}</h2>
                                                <p>
                                                    {event.eventDescription}
                                                </p>
                                            </div>

                                        </Card>
                                    </Link>

                                </Col>
                            )
                        })}
                    </Row>
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state)=>{

    return {
        bookinfo:state.bookinfo,
        EventList:state.auth.user.EventList
    }

}

export default connect(mapStateToProps,{setDataBooking})(NeedPhotosesh)