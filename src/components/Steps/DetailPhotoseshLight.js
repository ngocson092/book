/**
 * Created by lamtanphiho on 8/9/2017.
 */
import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
const {Header} = Layout
class PhotoseshType extends Component{
    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        };
    }
    componentDidMount = function () {
        let booknow = localStorage.getItem("booknow");
        booknow = JSON.parse(booknow);
        let photoseshType = localStorage.getItem("user");
        photoseshType = JSON.parse(photoseshType).photoseshTypeList;
        let detail = photoseshType.filter(x=>{
            return x.photoSeshTypeName == booknow.info.photoseshType;
        }).map(type=>{
            return type;
        })
        this.setState({detail: detail[0]})
        // console.log(detail)
    }
    render() {
        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/book-now'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now/photosesh-type'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">Details</h2>

                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-image">
                                    <img src="/images/6.jpg" alt=""/>
                                </div>
                            </Card>

                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-image">
                                    <img src="/images/7.jpg" alt=""/>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-image">
                                    <img src="/images/8.jpg" alt=""/>
                                </div>
                            </Card>

                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-image">
                                    <img src="/images/9.jpg" alt=""/>
                                </div>
                                <div className="custom-card">
                                    <h3>{this.state.detail.photoSeshTypeName}</h3>

                                    <p>
                                        <div>${this.state.detail.photoSeshTypePriceLB} - ${this.state.detail.photoSeshTypePriceUB} / hr</div>
                                        {this.state.detail.photoSeshTypeOnClickDescription}
                                    </p>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-detail-light">
                                    <h2>Less cost, not a moment lost!</h2>
                                    <Link className="btn-middle" to={'/book-now/need-a-photosesh'}> NEXT </Link>
                                </div>
                            </Card>

                        </Col>
                    </Row>
                </div>

            </div>
        )
    }

}

export default PhotoseshType