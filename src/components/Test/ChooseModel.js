import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Card,Col,Row } from 'antd';

import Thumbnail from './include/Thumbnail'
class ChooseModel extends Component{

    state = {
        list:[
            {
                title:'X2 / 11',
                image:'x2'
            },
            {
                title:'G5',
                image:'g5'
            }

        ]
    }

    render(){

        const ListModel = this.state.list.map(item=>{

            let images = [
                '/images/'+item.image+'-front.png',
                '/images/'+item.image+'-back.png',
                '/images/'+item.image+'-side.png',
            ]



            return (

                <Col xs={24} sm={6} md={6} lg={6} xl={4} >
                    <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>

                        <Thumbnail images={images} />

                        <div className="custom-card">
                            <h3>{item.title} </h3>
                            <p>kennjdemo.com</p>
                        </div>
                    </Card>
                </Col>
            )

        })

        return (
            <Row  gutter={16}>
                {ListModel}
            </Row>

        )
    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps)(ChooseModel)