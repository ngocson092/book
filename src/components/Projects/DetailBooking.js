import React,{Component} from 'react'
import {connect} from 'react-redux';
import EditBookingForm from './Include/EditBookingForm';

class DetailBooking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            booking: {
                agentName: {}
            }
        };

    }

    componentWillReceiveProps(newProps){
        this.setState({booking:newProps.booking})
    }
    render() {

        console.log(this.state.booking)
        return (
            <div>
                <EditBookingForm booking={this.state.booking} />
            </div>
        )
    }

}

const mapStateToProps = (state,props)=>{
    let booking_id = props.match.params.booking_id
    return {
        booking:state.projects.bookings.filter(booking=>booking._id==booking_id).shift()
    }
}


export default connect(mapStateToProps,{})(DetailBooking)

