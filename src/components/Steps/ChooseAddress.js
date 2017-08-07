import React from 'react'
import ReactDOM from 'react-dom'
import createClass from 'create-react-class'
import { Row, Col,Button,Input } from 'antd';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react'

import '../../stylesheet/_chooseaddress.scss'

const GG_MAP_APIKEY = 'AIzaSyDAqY0FGMvPU9zvmpdP07C1Es17sKOoEZs';
const GG_MAP_VERSION = '3.27'

const Contents = createClass({
    getInitialState() {
        return {
            place: null,
            position: null
        }
    },

    onSubmit: function(e) {
        e.preventDefault();
    },

    componentDidMount: function() {
        this.renderAutoComplete();
    },

    componentDidUpdate(prevProps) {
        const {google, map} = this.props;
        if (map !== prevProps.map) {
            this.renderAutoComplete();
        }
    },

    renderAutoComplete: function() {
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

    render: function() {
        const props = this.props;
        const {position} = this.state;

        return (
            <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                    <form onSubmit={this.onSubmit}>
                        <Input
                            ref='autocomplete'
                            placeholder="Enter your location"  />
                        <Button type='submit'>Find</Button>
                    </form>
                    <div>
                        <div>Lat: {position && position.lat()}</div>
                        <div>Lng: {position && position.lng()}</div>
                    </div>

                </Col>
                <Col xs={18} sm={18} md={18} lg={18} xl={18}>

                    <Map {...props}
                         containerStyle={{
                             position: 'relative',
                             height: '100vh',
                             width: '100%'
                         }}
                         center={this.state.position}
                         centerAroundCurrentLocation={false}>
                        <Marker position={this.state.position} />
                    </Map>

                </Col>

            </Row>
        )
    }
})

const MapWrapper = createClass({
    render: function() {
        const props = this.props;
        const {google} = this.props;

        return (
            <div className="choose-address">
                <Map google={google}
                     className={'map'}
                     visible={false}>
                    <Contents {...props} />
                </Map>
            </div>
        );
    }
})


export default GoogleApiWrapper({
    apiKey: GG_MAP_APIKEY,
    version:GG_MAP_VERSION
})(MapWrapper)


