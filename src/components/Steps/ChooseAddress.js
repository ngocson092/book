import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import createClass from 'create-react-class'
import {Row, Col, Button, Input, Radio, Select, Form,TimePicker,DatePicker,Icon} from 'antd';
import moment from 'moment'
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react'
import {NOW, LATER, DURATIONS,TIME} from '../../define'
import {setInfoStepOne} from '../../actions'



/*import style*/

import '../../stylesheet/_chooseaddress.scss'

/*import style*/

/* ----------- google map config -------------*/
const GG_MAP_APIKEY = 'AIzaSyDAqY0FGMvPU9zvmpdP07C1Es17sKOoEZs';
const GG_MAP_VERSION = '3.27'
/* ----------- google map config -------------*/




const timeFormat = 'HH:mm';
const dateFormat = 'YYYY/MM/DD';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

const Contents = createClass({
    getInitialState() {
        return {
            place: null,
            position: null,
            book_type: NOW,
            booknow:{
                duration:'0.5'
            },
            booklater:{
                date:moment(),
                to:TIME[0],
                from:TIME[1]
            },
        }
    },

    setModalVisible(modal_booknow) {
        this.setState({modal_booknow});
    },
    onSubmit: function (e) {
        e.preventDefault();
    },

    componentDidMount: function () {
        this.renderAutoComplete();
    },

    componentDidUpdate(prevProps) {
        const {google, map} = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    },

    renderAutoComplete: function () {
        const {google, map} = this.props;

        if (!google || !map) return;

        const aref = this.refs.autocomplete;
        const node = ReactDOM.findDOMNode(aref);
        var autocomplete = new google.maps.places.Autocomplete(node);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(24);
            }
            this.setState({
                place: place,
                position: place.geometry.location
            })
        })
    },


    handleDateChange(e) {
        console.log(1);
    },
    handleFromChange(e) {
        console.log(1);
    },
    onBookTypeChange(e) {
        this.setState({
            book_type: e.target.value
        })
    },
    handleNext(e) {

        let data = {
            book_type:this.state.book_type,
            info: this.state['book'+this.state.book_type]
        }
        this.props.setInfoStepOne(data)
    },

    render: function () {
        const props = this.props;
        const {position} = this.state;

        const Duration_Options = DURATIONS.map((d, i)=> {
            return (
                <Option value={d}>{d} hours</Option>
            )
        })
        const Time_Options = TIME.map((d, i)=> {
            return (
                <Option value={d}>{d}</Option>
            )
        })


        const BookNow = (
            <FormItem label="Estimated Duration for Book Now">
                <Select
                    style={{width: '100%'}}
                    onChange={(duration)=>{

                        this.setState({
                            booknow: {duration}
                        })

                    }}
                    defaultValue={'0.5'}
                >
                    {Duration_Options}
                </Select>
            </FormItem>
        )
        const BookLater = (
            <div className="booklater-duration">

                <FormItem label="Select Date">


                    <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="Select Time"
                        defaultValue={this.state.booklater.date}
                        onChange={(date,date_str)=>{

                            const booklater = { ...this.state.booklater };
                            booklater.date = date;
                            this.setState({booklater});


                        }}

                    />

                </FormItem>

                <FormItem label="From" className={'from'}>
                    <Select
                        onChange={(from)=>{

                            const booklater = { ...this.state.booklater };
                            booklater.from = from;
                            this.setState({booklater});

                        }}

                        defaultValue={TIME[0]} style={{ width: '100%' }}>
                        {Time_Options}
                    </Select>
                </FormItem>

                <FormItem label="To" className={'to'}>
                    <Select
                        onChange={(to)=>{
                            const booklater = { ...this.state.booklater };
                            booklater.to = to;
                            this.setState({booklater});

                        }}
                        defaultValue={TIME[1]} style={{ width: '100%' }}>
                        {Time_Options}
                    </Select>
                </FormItem>

            </div>



        )

        return (
            <Row>


                <Col xs={10} sm={10} md={10} lg={6} xl={6} className={'sidebar'}>
                    <Form layout="vertical" onSubmit={this.onSubmit}>
                        <FormItem label="Your Address">
                            <Input
                                ref='autocomplete'
                                placeholder="Enter your location"
                            />
                        </FormItem>

                        <FormItem label="Do you want to Book now?">
                            <RadioGroup onChange={this.onBookTypeChange} value={this.state.book_type}>
                                <Radio value={NOW}>Book Now</Radio>
                                <Radio value={LATER}>Book Later</Radio>
                            </RadioGroup>
                        </FormItem>

                        {(this.state.book_type == NOW) ? BookNow : BookLater }

                        <FormItem>

                            <Button type="primary"
                                    onClick={this.handleNext}
                            >
                                Next
                            </Button>

                        </FormItem>
                    </Form>
                </Col>
                <Col xs={14} sm={14} md={14} lg={18} xl={18}>

                    <Map {...props}
                         containerStyle={{
                             position: 'relative',
                             height: 'calc(100vh - 80px)',
                             width: '100%'
                         }}
                         center={this.state.position}
                         centerAroundCurrentLocation={false}>
                        <Marker position={this.state.position}/>
                    </Map>

                </Col>

            </Row>
        )
    }
})

const MapWrapper = createClass({
    render: function () {
        const props = this.props;
        const {google} = this.props;

        return (
            <div className="choose-address">
                <Map google={google}
                     className={'map'}
                     visible={false}

                     containerStyle={{
                         height: 'initial'
                     }}
                >
                    <Contents {...props} />
                </Map>
            </div>
        );
    }
})


const mapStateToProps = (state)=>{
    return {
    }
}


const ChooseAddress = GoogleApiWrapper({
    apiKey: GG_MAP_APIKEY,
    version: GG_MAP_VERSION
})(MapWrapper)

export default connect(mapStateToProps,{setInfoStepOne})(ChooseAddress)




