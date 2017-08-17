import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Route,Link} from 'react-router-dom'
const {Header} = Layout
class PhotoseshType extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content : '',
            photoseshType: []
        };

    }
    componentDidMount = function () {
        let self = this;
        let photoseshType = localStorage.getItem("user");
        photoseshType = JSON.parse(photoseshType).photoseshTypeList;

        self.setState({photoseshType: photoseshType});
        let content = photoseshType.map((phototype, i) => {
            const img = "/images/"+ ++i +".jpg";
            return (
                <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}>
                    <Link to={'/book-now/photosesh-type/detail-light'}>
                        <Card bodyStyle={{padding: 0}}>
                            <div className="custom-image">
                                <img src={img} alt=""/>
                            </div>
                            <div className="custom-card">
                                <h2>{phototype.photoSeshTypeName}</h2>
                                <p>
                                    <div>${phototype.photoSeshTypePriceLB} - ${phototype.photoSeshTypePriceUB} / hr</div>
                                    {phototype.photoSeshTypeOnClickDescription}
                                </p>
                            </div>

                        </Card>
                    </Link>

                </Col>
            )
        })
        self.setState({content: content});
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
                        {this.state.content}

                    </Row>
                </div>

            </div>
        )
    }

}

export default PhotoseshType