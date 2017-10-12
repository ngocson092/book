import React,{Component} from 'react'
import {connect} from 'react-redux';


class DetailBooking extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.booking)}
                </pre>
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

