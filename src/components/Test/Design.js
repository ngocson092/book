import React,{Component} from 'react'
import $ from 'jquery'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {TwitterPicker } from 'react-color'
import {Button,Row,Col,Collapse,Radio, Input} from 'antd'
import classnames from 'classnames'

import Back from './Models/x2/back'
import Front from './Models/x2/front'



const RadioGroup = Radio.Group
const Panel = Collapse.Panel
class Design extends Component{

    state = {
        model:'a2000_x2',
        background:'ffffff',
        value: 1,
        angle_active:'front'
    }


    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }


    componentDidMount(){


    }

    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };
    render(){



        let angles =  ['front','back','side']

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const GloveContainer =
        (
            <div className="glove-container">
                {angles.map(angle=>{

                    let src = '/images/'+ this.state.model + '_overlay_'+angle+'_600_ss.png'

                    return (

                        <div className={classnames(angle,{'active':this.state.angle_active === angle})}>
                            <div className="glove-overlay">
                                <img src={src} alt=""/>
                            </div>

                            <div className="glove-item">
                                <Front/>
                            </div>
                        </div>

                    )

                })}

            </div>

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

                        <Collapse accordion bordered={false} defaultActiveKey={['1']} className="customize-glove-parts">
                            <Panel header={'Leather'} key="1">

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


                                <RadioGroup onChange={this.onChange} value={this.state.value} style={{width:'100%','margin-top':'20px'}}>
                                    <Radio style={radioStyle} value={1}>Back Finger</Radio>
                                    <Radio style={radioStyle} value={2}>Wrist</Radio>
                                    <Radio style={radioStyle} value={3}>Web</Radio>
                                    <Radio style={radioStyle} value={4}>Palm</Radio>

                                </RadioGroup>


                            </Panel>
                            <Panel header={'Trim'} key="2">
                                <p>2222</p>
                            </Panel>
                            <Panel header={'Lacing'} key="3">
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
        model:state.model
    }
}

export default connect(mapStateToProps)(Design)