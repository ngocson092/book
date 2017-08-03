import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Card,Col,Row,Button,Breadcrumb } from 'antd';
import classnames from 'classnames'
import Thumbnail from './include/Thumbnail'
import {Route,Link} from 'react-router-dom'
import {ANGLES} from  '../actions'
import '../stylesheet/_choose_model.scss'

class ChooseModel extends Component{
    state = {
        list:[
            {
                title:'A1',
                model:'a1'
            },
            {
                title:'A1 - Test',
                model:'a1'
            },
            {
                title:'A1 - Demo',
                model:'a1'
            },
        ],
        model:null
    }
    selectModel = (model)=>{
        this.setState({model})
    }

    render(){

            const ListModel = this.state.list.map((item,i)=>{

            let images = ANGLES.map(angle=>`/images/${item.model}-${angle}.png`)

            return (

                <Col  key={i} xs={24} sm={8} md={8} lg={8} xl={6} >
                    <Card  className={classnames('card-item',{'checked':this.state.model === item.model})}
                           onClick={()=>{this.selectModel(item.model)}}
                           style={{ width: "100%" }}
                    >
                        <Thumbnail images={images} />
                        <div className="custom-card">
                            <h3>{item.title} </h3>
                            <Route render={({history}) => (
                                <Button
                                    type="primary" icon="smile-o"
                                    onClick={() => {
                                        history.push(`/design/${item.model}`)
                                    }}
                                >
                                    Custom Now
                                </Button>
                            )}/>
                        </div>
                    </Card>
                </Col>
            )

        })

        return (
            <div className="container">
                <Row>
                    <div className="breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>Select Model</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                </Row>

                <Row  gutter={16}>
                    {ListModel}
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