import React,{Component} from 'react'
import {Row, Col,Card,Layout,Button,Icon} from 'antd';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'

import {setDataBooking} from '../../actions/bookActions'

const {Header} = Layout
class PhotoseshType extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content : '',
            photoseshType: []
        };

    }


    handleNext(photosesh_type_name) {
        let new_book_data = {...this.props.bookinfo}
        new_book_data.info.photosesh_type_name = photosesh_type_name
        this.props.setDataBooking(new_book_data)
    }

    render() {

        const ListPhotoseshType = this.props.photoseshTypeList.map((phototype, i)=>{

            const img = "/images/"+ ++i +".jpg";
            return (
                <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}>
                    <Link to={"/book-now/photosesh-type/detail"}  onClick={()=>this.handleNext(phototype.photoSeshTypeName)}>
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

        return (
            <div className="photosesh-type">
                <Header id="header">
                    <Link className="logo" to={'/book-now'}>Photosesh - Book Now</Link>
                    <Link className={'btn-right'} to={'/book-now'}><Icon type="left" /> Back</Link>
                </Header>
                <div className="container">
                    <h2 className="title">Photosesh Type</h2>

                    <Row>

                        {ListPhotoseshType}

                    </Row>
                </div>

            </div>
        )
    }

}

const mapStateToProps = (state)=>{

    return {

        bookinfo:state.bookinfo,

        photoseshTypeList:state.auth.user.photoseshTypeList
    }

}

export default connect(mapStateToProps,{setDataBooking})(PhotoseshType)