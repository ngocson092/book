/**
 * Created by lamtanphiho on 8/9/2017.
 */
import '../../stylesheet/_needaphotosesh.scss'
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
import {cleanSlug} from  '../../utils/helper'
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

                <div className="container">
                    <ul className="menu_simple">

                        <li>Event Type</li> |
                        <li><Link to={'/book/photosesh-type/detail'}>Back</Link></li> |
                        <li><Link to={'/book/photosesh-type'}>Photosesh Type</Link></li> |
                        <li><Link to={'/book/'}>Select Another address</Link></li>
                    </ul>
                    <h2 className="head-title-center">I Need a PhotoSesh For ...</h2>


                    <Row>
                        {this.props.eventList.map((event, i) => {
                            const img = "/images/"+ ++i +".jpg";
                            return (
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}>
                                    <Link to={"/book/photographers"}  onClick={()=>this.handleNext(event.eventName)}>
                                        <Card bodyStyle={{padding: 0}}>
                                            <div className="custom-image">
                                                <img src={event.eventImage.thumb} alt=""/>
                                            </div>
                                            <div className="custom-card">
                                                <h2 className="title">{cleanSlug(event.eventName)}</h2>
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
        eventList:state.auth.user.eventList
    }

}

export default connect(mapStateToProps,{setDataBooking})(NeedPhotosesh)