import React,{Component} from 'react'
import $ from 'jquery'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {TwitterPicker } from 'react-color'
import {Button,Row,Col,Collapse,Radio, Input} from 'antd'
import classnames from 'classnames'


import {setAngleColor} from '../../actions'

import RenderProduct from './Products/Render'


const RadioGroup = Radio.Group
const Panel = Collapse.Panel
class Design extends Component{

    constructor(props){
        super(props)
    }

    state = {
        color_play:{
          leather:{
              Active:true,
              items:{
                  fingers:{
                      color:'#ffffff',
                      active:true
                  },
                  wrist:{
                      color:'#ffffff'
                  },
                  web:{
                      color:'#ffffff'
                  },
                  palm:{
                      color:'#ffffff'
                  }
              }
          }
        },
        angle_active:'front',
        product:{}
    }

    onChange = (e) => {

        this.setState({
            value: e.target.value,
        });
    }

    componentDidMount(){


        fetch(`/products/${this.props.match.params.model}.json`).then(res=>{
            return res.json()
        }).then(data=>{

            this.setState({product:data})

        })





    }

    handleChangeComplete = (color) => {
        this.props.setAngleColor(color.hex)
    };

    handleChangePanel = (panel)=>{

        console.log(panel);

    }

    render(){

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const GloveContainer =
        (
            <div><RenderProduct product={this.state.product} model={this.props.match.params.model}/></div>
        )


        const Design = (
            <div>
                <Row id="customize">
                    <Col xs={12} sm={20} md={18} lg={18} xl={20} className="main-design" >
                        {GloveContainer}
                    </Col>
                    <Col xs={12} sm={4} md={6} lg={6} xl={4} className="sidebar"  style={{height:$(window).height()}} >

                        <div className="color-play-header">
                            <div className="content">
                                <span id="glove-info">a2000 | x2   <span className="price price-container">$349.99</span></span>
                            </div>
                            <h2>CUSTOMIZE</h2>
                        </div>

                        <Collapse onChange={this.handleChangePanel} accordion bordered={false} defaultActiveKey={['1']} className="customize-glove-parts">
                            <Panel header={'Leather'} key="leather">

                                <TwitterPicker
                                    colors={[
                                        '#ffffff','#929292','#383838','#000000',
                                        '#f2c250','#fab400','#fb5300','#d61200',
                                        '#78000c','#78000c','#86105b','#a35802',
                                        '#452006','#b8d2da','#006ba6','#e033a2',
                                        '#1a407b','#0d1f2e','#2b1b66','#009d73','#009639']}
                                    color={ this.state.background }
                                    onChangeComplete={ this.handleChangeComplete }
                                />


                                <RadioGroup onChange={this.onChange} value={'wrist'} style={{"width":"100%","margin-top":"20px"}}>
                                    <Radio style={radioStyle} value={'fingers'}>Back Finger</Radio>
                                    <Radio style={radioStyle} value={'wrist'}>Wrist</Radio>
                                    <Radio style={radioStyle} value={'web'}>Web</Radio>
                                    <Radio style={radioStyle} value={'palm'}>Palm</Radio>
                                </RadioGroup>


                            </Panel>
                            <Panel header={'Trim'} key="trim">
                                <p>2222</p>
                            </Panel>
                            <Panel header={'Lacing'} key="lacing">
                                <p>heheheeh11111111</p>
                            </Panel>

                        </Collapse>


                        <Route render={({history}) => (
                            <Button
                                className="back"
                                type="primary"
                                icon="arrow-left"
                                onClick={() => {
                                    history.push('/')
                                }}
                            >
                                Back
                            </Button>
                        )}/>
                    </Col>


                </Row>



            </div>



        )

        return Design
    }

}

const mapStateToProps = (state)=>{
    return {
    }
}

export default connect(mapStateToProps,{setAngleColor})(Design)