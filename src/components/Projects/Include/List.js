import style from './list.css'

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Layout, Spin, Row, Col, Icon, Card, Badge} from 'antd';
import {connect} from 'react-redux';
import {STATUS} from '../../../define'
import moment from 'moment'

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    goTo(route) {
        this.props.history.replace(route)
    }


    render() {


        let ColColumn_first = {
            xs: {span: 24, offset: 0},
            sm: {span: 24, offset: 0},
            md: {span: 24, offset: 0},
            lg: {span: 24, offset: 0},
            xl: {span: 24, offset: 0},
        }

        let ColColumn = {
            xs: {span: 24, offset: 0},
            sm: {span: 12, offset: 0},
            md: {span: 12, offset: 0},
            lg: {span: 12, offset: 0},
            xl: {span: 12, offset: 0},
            className: style.item_wrapper
        }


        return (

            <div>
                <Row>
                    <Col {...ColColumn_first}>
                        <Card className={style.first_item}>
                            <h2><Link className={style.new_project_text} to={'/book'}>New Project</Link></h2>
                            <Link className={style.icon_wrapper} to={'/book'}><Icon type="plus"/></Link>
                            <Link to={'/book'} className={style.item_btn}>E-Z BOOK</Link>
                            <Link to={'/book'} className={style.item_btn}>Advanced</Link>
                        </Card>
                    </Col>

                </Row>
                { (this.props.loading) ? (<div style={{textAlign: 'center', padding: '100px 0'}}><Spin /></div>) : '' }

                {this.props.bookings.map (booking=> {

                    let {titleOrDescription,agentName,eventType,appointmentAddress,agentPrice,appointmentStatus,appointmentEndTime,appointmentDate,appointmentStartTime} = booking

                    let fullName = agentName.firstName + ' ' + agentName.lastName;

                    let Status = ()=>{
                        let tmp_status = 'processing'
                        switch (appointmentStatus){
                            case STATUS['PENDING']:
                                tmp_status = 'processing'
                                break;
                            case STATUS['ACTIVE']:
                                tmp_status = 'error'
                                break;
                            case STATUS['COMPLETE']:
                                tmp_status = 'success'
                                break;
                        }
                        return <Badge className={style.status_icon} status={tmp_status} />

                    }

                    let url = `/projects/bookings/${booking._id}`
                    return (
                        <Row key={booking._id}>

                                <Card className={style.item} onClick={(e)=>{e.preventDefault(); this.goTo(url) }}>

                                    <Col {...ColColumn}>


                                        <h2 className={style.title}>{titleOrDescription}</h2>

                                        <div className={style.address}>at {appointmentAddress}</div>
                                        <div className={style.agent_name}>With {fullName}</div>


                                    </Col>


                                    <Col {...ColColumn}>
                                        <div className={style.status}>{appointmentStatus} <Status /></div>
                                        <div
                                            className={style.time}>{appointmentStartTime + ((appointmentEndTime != '') ? ' - ' + appointmentEndTime : '')}</div>
                                        <div className={style.date}>On {moment(appointmentDate).format('MMMM Do YYYY')}</div>

                                        <Link style={{display: 'inline-block', marginTop: 20, color: '#000000'}} to={url}
                                              className={style.item_btn}>DETAILS</Link>
                                    </Col>
                                </Card>

                        </Row>
                    )
                })}
            </div>


        )






    }

}

const mapStateToProps = (state)=> {

    let active_status = state.projects.active_status
    return {
        bookings: (active_status == STATUS['ALL']) ? state.projects.bookings : state.projects.bookings.filter(booking=> booking.appointmentStatus == active_status)
    }
}


export default connect(mapStateToProps, {})(Grid)

