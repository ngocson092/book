import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
const {Header} = Layout
class PhotoseshType extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">Photosesh Type</h2>

                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-image">
                                    <img src="/images/1.jpg" alt=""/>
                                </div>
                                <div className="custom-card">
                                    <h3>Photosesh Light</h3>

                                    <p>
                                        <div>$20 - $25 / hr</div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorum facere fuga ipsum numquam sed sunt temporibus ut. Consequuntur distinctio dolores eveniet facilis fugiat id illum numquam qui tenetur voluptatem!
                                    </p>
                                </div>
                            </Card>

                        </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card  bodyStyle={{ padding: 0 }}>
                                <div className="custom-image">
                                    <img src="/images/2.jpg" alt=""/>
                                </div>
                                <div className="custom-card">
                                    <h3>Photosesh</h3>

                                    <p>
                                        <div>$30 - $75 / hr</div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolorum facere fuga ipsum numquam sed sunt temporibus ut. Consequuntur distinctio dolores eveniet facilis fugiat id illum numquam qui tenetur voluptatem!
                                    </p>
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