import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Card,Col,Row,Button } from 'antd';
import classnames from 'classnames'
import Thumbnail from './include/Thumbnail'
import {Route} from 'react-router-dom'
import {ANGLES} from  '../actions'
import '../stylesheet/_choose_model.scss'

class ChooseModel extends Component{
    state = {
        list:[
            {
                title:'X2 / 11',
                model:'a2000_x2'
            },
            {
                title:'g5 / 12',
                model:'g5'
            }
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
                                    history.push(`/design/${this.state.model}`)
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