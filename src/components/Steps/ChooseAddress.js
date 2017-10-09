import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {Icon} from  'antd'
import Header from '../bookings/header';


import createClass from 'create-react-class'
import {Row, Col, Button, Input, Radio, Select, Form,DatePicker} from 'antd';
import moment from 'moment'
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react'
import {NOW, LATER, DURATIONS,TIME} from '../../define'
import {setDataBooking,setBooktype} from '../../actions/bookActions'

/* ----------- google map config -------------*/
const GG_MAP_APIKEY = process.env.GG_MAP_APIKEY;
const GG_MAP_VERSION = process.env.GG_MAP_VERSION

/* ----------- google map config -------------*/

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const Contents = createClass({
    getInitialState() {
        return {
            place: '',
            position: {},
            info:{
                duration:DURATIONS[0],
                date:moment(),
                from:TIME[0],
                to:TIME[1]
            },
            addressRequired : '',
            isAddress : false,
        }
    },

    goTo(route) {
        this.props.history.replace(`${route}`)
    },


    componentDidUpdate(prevProps) {

        const {map} = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    },

    fetchLocation(lat,lng){

        fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&sensor=true`)
            .then(res=>res.json())
            .then((data)=>{
                setTimeout(()=>{

                    if(data.status == 'OK'){
                        this.setState({position:{lat,lng},place:data.results[0]['formatted_address']})
                    }


                },1000)
            })
    },

    componentDidMount(){



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
                position: {lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),}
            })
        })
    },

    handleNext(e) {

        if(this.props.place != ''){

            let {place} = this.state
            let new_info = {...this.state.info,place,position:this.state.position}

            let data = {
                book_type:this.props.book_type,
                info: new_info
            }

            this.goTo('/book/photosesh-type')

            this.props.setDataBooking(data)

        } else this.setState({
            addressRequired: 'address is required !'
        })

    },
    handleChange(data){

        let new_info = {...this.state.info}
        new_info[Object.keys(data).pop()] = data[Object.keys(data)]
        this.setState({
            info: new_info
        })
    },
    handleAddressChange(evt){
        let isAddress = false;
        if(evt.target.value != '') isAddress = true
        this.setState({
            addressRequired: ''
        })
        this.setState({
            isAddress: isAddress
        })
    },

    componentWillReceiveProps: function(nextProps) {
        if(typeof nextProps.info.position != 'undefined' && nextProps.info.position && typeof nextProps.info.position.lat != 'undefined' ){

            let {duration,date,to,from}  = nextProps.info
            this.setState({duration,date,to,from})
            this.fetchLocation(nextProps.info.position.lat,nextProps.info.position.lng)

        }else{

            /*
             *
             * show current location by client device
             *
             * */

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition((info_location)=> {
                    this.fetchLocation(info_location.coords.latitude,info_location.coords.longitude)

                }, function() {

                });
            }
        }
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
                        defaultValue={moment(props.info.date)}
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


                <Col xs={10} sm={10} md={10} lg={6} xl={6} className={'sidebar'}>
                    <Form layout="vertical" onSubmit={this.onSubmit}>
                        <FormItem label="Your Address">
                            <Input
                                defaultValue={this.props.info.place}
                                ref='autocomplete'
                                placeholder="Enter your location"
                                onBlur={this.handleAddressChange} />
                            <label className="error">{this.state.addressRequired}</label>
                        </FormItem>

                        <FormItem label="Do you want to Book now?">
                            <RadioGroup onChange={(e)=>{
                                props.setBooktype(e.target.value)
                            }} defaultValue={props.book_type}>
                                <Radio value={NOW}>Book Now</Radio>
                                <Radio value={LATER}>Book Later</Radio>
                            </RadioGroup>
                        </FormItem>

                        {(props.book_type == NOW) ? BookNow : BookLater }

                        <FormItem>

                            <Button
                                style={{width: '100%',
                                    borderRadius: 0}}
                                type="primary"

                                disabled={this.state.place == '' || this.state.position.lat == '' || this.state.position.lng == ''}

                                onClick={this.handleNext}
                            >
                                Next
                            </Button>

                        </FormItem>
                    </Form>

                    <ul className="menu_simple">
                        <li>Book Photosesh</li> |
                        <li><Link to={'/'}> Home Page</Link></li> |
                        <li><Link to={'/my-account'}>My Account</Link></li>

                    </ul>


                </Col>
                <Col xs={14} sm={14} md={14} lg={18} xl={18}>

                    <Map {...props}
                         clickableIcons={false}
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
                <style>{css}</style>
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
                <Map
                     clickableIcons={false}
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
        info:state.bookinfo.info
    }
}


const ChooseAddress = GoogleApiWrapper({
    apiKey: GG_MAP_APIKEY,
    version: GG_MAP_VERSION
})(MapWrapper)

export default connect(mapStateToProps,{setDataBooking,setBooktype})(ChooseAddress)

const css = `
    .error{
        color: red
    }
`


