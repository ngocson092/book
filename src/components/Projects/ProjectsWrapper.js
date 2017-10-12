import style from './projects_wrapper.css'

import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import { Layout } from 'antd';
import {connect} from  'react-redux'
import Bookings from './Bookings'
import DetailBooking from './DetailBooking'
import {getProjects} from '../../actions/manageBookingsAction'

const {  Content, Sider } = Layout;



class ProjectsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount (){
        this.props.getProjects()
    }


    render() {
        return (
            <div>
                <Route  exact={true}  path={`${this.props.match.url}/`} component={Bookings}/>
                <Route  exact={true}  path={`${this.props.match.url}/bookings`} component={Bookings}/>
                <Route name="detail_booking"  exact={true}  path={`${this.props.match.url}/bookings/:booking_id`} component={DetailBooking}/>
            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {

    }
}

export default connect(mapStateToProps,{getProjects})(ProjectsWrapper)


