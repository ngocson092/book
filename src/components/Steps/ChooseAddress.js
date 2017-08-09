import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'


import createClass from 'create-react-class'
import {Row, Col, Button, Input, Radio, Select, Form,DatePicker,Layout,Icon} from 'antd';
import moment from 'moment'
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react'
import {NOW, LATER, DURATIONS,TIME} from '../../define'
import {setInfoStepOne,setBooktype} from '../../actions'

/* ----------- google map config -------------*/
const GG_MAP_APIKEY = 'AIzaSyDAqY0FGMvPU9zvmpdP07C1Es17sKOoEZs';
const GG_MAP_VERSION = '3.27'
/* ----------- google map config -------------*/

const {Header} = Layout;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Contents = createClass({
    getInitialState() {
        return {
            redirect_to_step_2:false,
            place: null,
            position: null,
            info:{
                duration:DURATIONS[0],
                date:moment(),
                from:TIME[0],
                to:TIME[1]
            }
        }
    },

    onSubmit: function (e) {
        e.preventDefault();
    },


    componentDidMount: function () {


        /*
        *
        * show current location by client device
        *
        * */


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((info_location)=> {

                var position = {
                    lat: info_location.coords.latitude,
                    lng: info_location.coords.longitude
                };

                fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${info_location.coords.latitude},${info_location.coords.longitude}&sensor=true`)
                    .then(res=>res.json())
                    .then((data)=>{
                        this.setState({position,place:data.results[0]['formatted_address']})
                    })

            }, function() {

            });
        }


    },

    componentDidUpdate(prevProps) {
        const {map} = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    },


    renderAutoComplete: function (location) {
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
                map.setZoom(15);
            }

            this.setState({
                place: place.formatted_address,
                position: place.geometry.location
            })
        })
    },

    handleNext(e) {

        let data = {
            book_type:this.props.book_type,
            info: this.state.info,
            place:this.state.place
        }

        this.setState({
            redirect_to_step_2:true
        })
        this.props.setInfoStepOne(data)
    },
    handleChange(data){

        /*
        * just save to local state for change on local component
        * when they click on next button then set data to redux
        * */

        let new_info = {...this.state.info}
        new_info[Object.keys(data).pop()] = data[Object.keys(data)]
        this.setState({
            info: new_info
        })
    },

    render: function () {
        const props = this.props;

        const Duration_Options = DURATIONS.map((d, i)=> {
            return (
                <Option key="i" value={d}>{d} hours</Option>
            )
        })
        const Time_Options = TIME.map((d, i)=> {
            return (
                <Option  key="i" value={d}>{d}</Option>
            )
        })


        const BookNow = (
            <FormItem label="Estimated Duration for Book Now">
                <Select
                    style={{width: '100%'}}
                    onChange={(duration)=>this.handleChange({duration})}
                    defaultValue={props.info.duration}
                >
                    {Duration_Options}
                </Select>
            </FormItem>
        )
        const BookLater = (
            <div className="booklater-duration">
                <FormItem label="Select Date">


                    <DatePicker
                        style={{width:'49%'}}
                        format="YYYY-MM-DD"
                        placeholder="Select Date"
                        defaultValue={props.info.date}
                        onChange={(date)=>this.handleChange({date:date})}


                    />

                </FormItem>

                <FormItem label="From" className={'from'}>
                    <Select
                        onChange={(from)=>this.handleChange({from})}
                        defaultValue={props.info.from} style={{ width: '100%' }}>
                        {Time_Options}
                    </Select>
                </FormItem>

                <FormItem label="To" className={'to'}>
                    <Select
                        onChange={(to)=>this.handleChange({to})}
                        defaultValue={props.info.to} style={{ width: '100%' }}>
                        {Time_Options}
                    </Select>
                </FormItem>

            </div>
        )

        return (
            <Row>
                {this.state.redirect_to_step_2 && ( <Redirect to={'/book-now/step2'}/>)}

                <Col xs={10} sm={10} md={10} lg={6} xl={6} className={'sidebar'}>
                    <Form layout="vertical" onSubmit={this.onSubmit}>
                        <FormItem label="Your Address">
                            <Input
                                ref='autocomplete'
                                placeholder="Enter your location"
                            />
                        </FormItem>

                        <FormItem label="Do you want to Book now?">
                            <RadioGroup onChange={(e)=>{
                                props.setBooktype(e.target.value)
                            }} value={this.props.book_type}>
                                <Radio value={NOW}>Book Now</Radio>
                                <Radio value={LATER}>Book Later</Radio>
                            </RadioGroup>
                        </FormItem>

                        {(props.book_type == NOW) ? BookNow : BookLater }

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
                         zoom={16}
                         centerAroundCurrentLocation={true}>
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
                <Header id="header">
                  <Link className="logo" to={'/'}>Photosesh - Book Now</Link>
                  <Link className={'btn-right'} to={'/'}><Icon type="home" /> Home</Link>
                </Header>
                <Map

                     google={google}
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
        book_type: state.bookinfo.book_type,
        info:{
            duration:state.bookinfo.info.duration,
            date:state.bookinfo.info.date,
            to:state.bookinfo.info.to,
            from:state.bookinfo.info.from
        }
    }
}


const ChooseAddress = GoogleApiWrapper({
    apiKey: GG_MAP_APIKEY,
    version: GG_MAP_VERSION
})(MapWrapper)

export default connect(mapStateToProps,{setInfoStepOne,setBooktype})(ChooseAddress)




