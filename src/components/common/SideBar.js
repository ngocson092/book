import style from './sidebar.css'
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../actions/authActions'
import {Popconfirm,message,Button} from 'antd'

class Sidebar extends Component {
    goTo(route){
        this.props.history.replace(route)
    }
    render() {
        return (
            <div className={style.sidebar}>
                <div  className={style.logo}>
                    <img src="/images/PhotoSesh_Logo.jpg" alt=""/>
                </div>

                <div className={style.menu}>
                    <ul>
                        <li><Link to={'/activity'}>Activity</Link></li>
                        <li><Link to={'/projects'}>Projects <span className={style.badge}>{this.props.total_bookings}</span></Link></li>
                        <li><Link to={'/proposals'}>Proposals <span className={style.badge}>2</span></Link></li>
                        <li><Link to={'/settings'}>Settings</Link></li>
                        <li><Link to={'/support'}>Support</Link></li>
                        <li className={style.devider}></li>
                        <li><Link className={style.btn_transparent} to={'/book'}>New Projects</Link></li>

                        <li style={{marginTop: 40}}>
                            <Popconfirm placement="top" title={'Are you sure logout ?'} onConfirm={()=>{
                                this.props.logout();
                                this.goTo('/login')
                            }} okText="Yes" cancelText="No">
                                <a>LOGOUT</a>
                            </Popconfirm>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return {
        total_bookings:state.projects.bookings.length
    }
}
export default connect(mapStateToProps,{logout})(Sidebar)
