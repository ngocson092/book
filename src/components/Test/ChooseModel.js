import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Card,Col,Row,Button } from 'antd';
import classnames from 'classnames'
import Thumbnail from './include/Thumbnail'
import {Route} from 'react-router-dom'
class ChooseModel extends Component{

    state = {
        list:[
            {
                title:'X2 / 11',
                model:'x2'
            },
            {
                title:'G5',
                model:'g5'
            }

        ],
        model:null
    }
    selectModel = (model)=>{
        this.setState({model})
    }


    render(){

        const ListModel = this.state.list.map(item=>{

            let images = [
                '/images/'+item.model+'-front.png',
                '/images/'+item.model+'-back.png',
                '/images/'+item.model+'-side.png',
            ]

            return (

                <Col xs={24} sm={6} md={6} lg={6} xl={4} >
                    <Card  className={classnames({'checked':this.state.model == item.model})} onClick={()=>{this.selectModel(item.model)}}  style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
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
            <div className="container">
                <Row  gutter={16}>
                    {ListModel}
                </Row>
                <Row >

                    {!!this.state.model &&
                        <Route render={({history}) => (
                            <Button
                                type="primary" icon="smile-o"
                                onClick={() => {
                                    history.push('/design')
                                }}
                            >
                                Custom Now
                            </Button>
                        )}/>
                    }
                </Row>
            </div>

        )

    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps)(ChooseModel)