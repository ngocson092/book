/**
 * Created by lamtanphiho on 8/9/2017.
 */
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
const {Header} = Layout;

class PhotoseshType extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/photosesh-type/detail-light'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">I Need a PhotoSesh For ...</h2>

                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Link to={'/book-now/photographers'}>
                                <Card  bodyStyle={{ padding: 0 }}>
                                    <div className="custom-image">
                                        <img src="/images/1.jpg" alt=""/>
                                    </div>
                                    <div className="custom-card">
                                        <h3>Casual Events</h3>

                                        <p>
                                            Book for Birthdays, Showers, Engagements, Anniversaries, Bar/Bat Mitzvans or just random fun! Affordability is now makes sense to hire a photograper to shoot at your casual get togethers. Just enjoy yourself!
                                        </p>
                                    </div>
                                </Card>
                            </Link>

                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div onClick={this.getPhotoSesh}>
                                <Card  bodyStyle={{ padding: 0 }}>
                                    <div className="custom-image">
                                        <img src="/images/2.jpg" alt=""/>
                                    </div>
                                    <div className="custom-card">
                                        <h3>Formal Events</h3>

                                        <p>
                                            Experienced photographers can help capture your treasured momonts at Receptions, Dances, Formals, Weddings etc. Hiring extra shooters at a value can give you more coverage at less cost and not a moment lost.
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </Col>

                    </Row>
                </div>

            </div>
        )
    }

}

export default PhotoseshType