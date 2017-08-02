import React, {Component} from 'react'
import $ from 'jquery'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import {TwitterPicker} from 'react-color'
import {Button, Row, Col, Collapse, Radio} from 'antd'
import update from 'react-addons-update'
import {setAngleColor, initAngleColor, setActiveAngle} from '../actions'
import RenderProduct from './Products/Render'


import '../stylesheet/_design.scss'
const Preload = require('react-preload').Preload

const RadioGroup = Radio.Group
const Panel = Collapse.Panel
class Design extends Component {


    state = {
        part_type: {
            leather: 'palm',
            trim: 'binding',
            lacing: 'lace_4',
            stitching:'body_stitching'
        },
        part_type_active: 'leather',
        product: {}
    }

    onChange = (e) => {


        let part_type = update(this.state.part_type,
            {
                [this.state.part_type_active]: {

                    $set: e.target.value
                }
            });

        this.setState({
            part_type
        });
    }


    componentWillMount() {

        const init_angle = (product) => {
            let angle_init = {}
            Object.keys(product).forEach((angle) => {

                angle_init[angle] = {}
                product[angle].data.forEach(item => {
                    if (typeof angle_init[angle][item.part_type] == 'undefined') {
                        angle_init[angle][item.part_type] = {}
                    }
                    angle_init[angle][item.part_type][item.name] = '#ffffff'
                })

            })
            return angle_init
        }

        fetch(`/products/${this.props.match.params.model}.json`)
            .then(res => res.json())
            .then(data => {

                this.setState({product: data})
                this.props.initAngleColor(init_angle(data))
                this.props.setActiveAngle('front')
            })
    }


    handleColorChange = (color) => {
        let angle_active = this.props.angle_active,
            part_type_active = this.state.part_type_active,
            part_name_active = this.state.part_type[this.state.part_type_active];

        this.props.setAngleColor(angle_active, part_type_active, part_name_active, color.hex)

    };

    handleTypePartChange = (panel) => {
        this.setState({part_type_active: panel})
    }


    render() {

        const style = {
            radio: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },
            radio_group:{
                width:"100%"
            },
            sidebar: {
                height: $(window).height() - 64
            }
        }


        const colors = [
            '#ffffff', '#929292', '#383838', '#000000',
            '#f2c250', '#fab400', '#fb5300', '#d61200',
            '#78000c', '#78000c', '#86105b', '#a35802',
            '#452006', '#b8d2da', '#006ba6', '#e033a2',
            '#1a407b', '#0d1f2e', '#2b1b66', '#009d73', '#009639']


        let panel_data = {
            leather: [
                {
                    name: 'Back Finger',
                    value: 'fingers'
                },
                {
                    name: 'Web',
                    value: 'web'
                },
                {
                    name: 'Wrist',
                    value: 'wrist'
                },
                {
                    name: 'Palm',
                    value: 'palm'
                },
            ],
            trim: [
                {
                    name: 'Binding',
                    value: 'binding'
                },
                {
                    name: 'Welting Shell',
                    value: 'beading_1'
                },
                {
                    name: 'Welting Palm',
                    value: 'beading_2'
                },
            ],
            lacing: [
                {
                    name: 'Web',
                    value: 'lace_4'
                },
                {
                    name: 'Fingertops',
                    value: 'lace_3'
                },
                {
                    name: 'Heel',
                    value: 'lace_1'
                },
            ],
            stitching: [
                {
                    name: 'Logo Stitching',
                    value: 'logo_stitching'
                },
                {
                    name: 'Body Stitching',
                    value: 'body_stitching'
                }

            ]
        }


        const Panels = Object.keys(panel_data).map((part_type)=> {

            let Radio_List = panel_data[part_type].map(item=> {
                return (
                    <Radio
                        style={style.radio}
                        value={item.value}
                    >{item.name}
                    </Radio>
                )
            })

            return (

                <Panel header={part_type} key={part_type}>
                    <RadioGroup
                        onChange={this.onChange}
                        value={this.state.part_type[part_type]}
                        style={style.radio_group}
                    >
                        {Radio_List}
                    </RadioGroup>

                    <div className="color-watch">
                        <TwitterPicker
                            colors={colors}
                            onChangeComplete={ this.handleColorChange}
                        />
                    </div>
                </Panel>
            )
        })
        
        

        return (
            <div>
                <Row id="customize">

                    <Col xs={12} sm={20} md={18} lg={18} xl={20} className="glove-container">
                        <RenderProduct isthumb={true} product={this.state.product} model={this.props.match.params.model}/>
                        <RenderProduct isthumb={false} product={this.state.product} model={this.props.match.params.model}/>
                    </Col>
                    <Col xs={12} sm={4} md={6} lg={6} xl={4} className="sidebar"
                         style={{height: $(window).height() - 64}}>

                        <div className="color-play-header">
                            <div className="content">
                                <span id="glove-info">a2000 | x2   <span
                                    className="price price-container">$349.99</span></span>
                            </div>
                            <h2>CUSTOMIZE</h2>
                        </div>

                        <Collapse onChange={this.handleTypePartChange} accordion bordered={false}
                                  activeKey={this.state.part_type_active} defaultActiveKey={['leather']}
                                  className="customize-glove-parts">
                            {Panels}
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


    }

}
const mapStateToProps = (state) => {
    return {
        angle_active: state.design.angle_active
    }
}

export default connect(mapStateToProps, {setAngleColor, initAngleColor, setActiveAngle})(Design)