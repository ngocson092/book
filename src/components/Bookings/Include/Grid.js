import style from './grid.css'

import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Layout,Spin, Row, Col,Icon,Card,Badge} from 'antd';
import {setShowMode,setFilterStatus} from '../../../actions/manageBookingsAction'
import {connect} from 'react-redux';
import classnames from 'classnames'
import {GRID,LIST,STATUS} from '../../../define'
import {cleanSlug} from '../../../utils/helper'
import moment from 'moment'
const {  Content } = Layout;


class Grid extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {



        let wrapperCol = {
            xs: {span: 24, offset: 0},
            sm: {span: 8, offset: 0},
            md: {span: 8, offset: 0},
            lg: {span: 8, offset: 0},
            xl: {span: 6, offset: 0},
            className: style.item_wrapper
        }



        return (

            <Row>
                <Col {...wrapperCol}>
                    <Card  className={style.first_item}>
                        <h2> <Link  className={style.new_project_text} to={'/book'}>New Project</Link></h2>
                        <Link  className={style.icon_wrapper} to={'/book'}><Icon type="plus" /></Link>
                        <Link to={'/'} className={style.item_btn}>E-Z BOOK</Link>
                        <Link to={'/'} className={style.item_btn}>Advanced</Link>
                    </Card>
                </Col>


                {(this.props.bookings.length == 0) ? ( <div style={{textAlign:'center',padding:'100px 0'}}> <Spin /></div>):'' }

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

                    return (
                        <Col {...wrapperCol} key={booking._id}>
                            <Card className={style.item}>

                                <div className={style.status}>{appointmentStatus} <Status /></div>

                                <h2 className={style.title}>{titleOrDescription}</h2>

                                <div className={style.address}>at {appointmentAddress}</div>
                                <div className={style.agent_name}>With {fullName}</div>

                                <div className={style.time}>{appointmentStartTime + ((appointmentEndTime !='') ? ' - ' +  appointmentEndTime : '')}</div>
                                <div className={style.date}>On {moment(appointmentDate).format('MMMM Do YYYY')}</div>

                                <Link style={{display:'inline-block',marginTop:20,color:'#000000'}} to={'/'} className={style.item_btn}>DETAILS</Link>


                            </Card>
                        </Col>
                    )
                })}

            </Row>


        )
    }

}

const mapStateToProps = (state)=>{

    let active_status = state.bookings.active_status
    return {
        bookings :  (active_status == STATUS['ALL']) ? state.bookings.data : state.bookings.data.filter(booking=> booking.appointmentStatus == active_status )
    }
}



export default connect(mapStateToProps,{})(Grid)

