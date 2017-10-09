import React, {Component} from 'react'
import {Row, Col, Card, Layout, Button, Icon} from 'antd';
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import style from './photosesh_type.css'
import {setDataBooking} from '../../actions/bookActions'

const {Header} = Layout
class PhotoseshType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            photoseshType: []
        };

    }

    goTo(route) {
        this.props.history.replace(route)
    }

    handleNext(photosesh_type_name) {
        let new_book_data = {...this.props.bookinfo}
        new_book_data.info.photosesh_type_name = photosesh_type_name
        this.props.setDataBooking(new_book_data)
        this.goTo('/book/photosesh-type/detail')
    }

    render() {

        const ListPhotoseshType = this.props.photoseshTypeList.map((phototype, i)=> {

            const img = "/images/" + ++i + ".jpg";
            return (
                <Col xs={12} sm={12} md={12} lg={12} xl={12} key={i}  style={{padding: 15}}>
                    <Card onClick={()=>this.handleNext(phototype.photoSeshTypeName)} style={{cursor:'pointer'}}>
                        <div className={style['custom-image']}>
                            <img src={img} alt=""/>
                        </div>
                        <div className={style['custom-card']}>
                            <h2>{phototype.photoSeshTypeName}</h2>
                            <div>
                                <div>${phototype.photoSeshTypePriceLB} - ${phototype.photoSeshTypePriceUB} / hr</div>
                                {phototype.photoSeshTypeOnClickDescription}
                            </div>
                        </div>
                    </Card>
                </Col>
            )

        })

        return (
            <div className={style['photosesh-type']}>
                <div className={style['container']}>
                    <ul className="menu_simple">
                        <li><Link to={'/book'}>Back</Link></li>
                        |
                        <li><Link to={'/'}>Home Page</Link></li>
                    </ul>
                    <h2 className="head-title-center">Photosesh Type</h2>
                    <Row>
                        {ListPhotoseshType}
                    </Row>

                </div>
            </div>
        )
    }

}

const mapStateToProps = (state)=> {

    return {

        bookinfo: state.bookinfo,

        photoseshTypeList: state.auth.user.photoseshTypeList
    }

}

export default connect(mapStateToProps, {setDataBooking})(PhotoseshType)