import style from './projects_wrapper.css'

import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import { Layout } from 'antd';
import {connect} from  'react-redux'
import Bookings from './Bookings'
import DetailBooking from './DetailBooking'
import {getBookings,setBookings} from '../../actions/projectAction'

const {  Content, Sider } = Layout;



class ProjectsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }
    componentWillMount (){



        if(!this.props.has_bookings){
            this.setState({loading:true})
            getBookings().then(res=>{
                this.setState({loading:false})
                if (res.data.data) {
                    let data = [...res.data.data['pastAppointment'],...res.data.data['upcomingAppointment']];
                    this.props.setBookings(data) // dispatch data
                }
            },err=>{
                this.setState({loading:false})
            })
        }


    }


    render() {
        return (
            <div>
                <Route  exact={true}  path={`${this.props.match.url}/`} render={(props)=> (<Bookings {...props} loading={this.state.loading} />)}/>
                <Route  exact={true}  path={`${this.props.match.url}/bookings`} render={(props)=> (<Bookings  {...props} loading={this.state.loading}/>)}/>
                <Route name="detail_booking"  exact={true}  path={`${this.props.match.url}/bookings/:booking_id`} component={DetailBooking}/>
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        has_bookings:state.projects.bookings.length > 0
    }
}

export default connect(mapStateToProps,{setBookings})(ProjectsWrapper)


