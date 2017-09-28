/**
 * Created by lamtanphiho on 8/8/2017.
 */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import MainMenu from './Menu';
import {Menu, Dropdown, Icon, message, Tooltip, Layout} from 'antd';
import Headphone from 'react-icons/lib/ti/headphones'
import {logout} from '../../actions/authActions'
import style from './header.css';

class Header extends Component {

    constructor(props) {
        super(props);
    }
    goTo = (route)=>{this.props.history.replace(route)}
    render() {
        const menu = (
            <Menu>

                <Menu.Item key="0">
                    <Link to="/my-account">My Account</Link>
                </Menu.Item>
                <Menu.Item key="5"
                >
                    <a
                        onClick={() => {
                            this.props.logout();
                            this.goTo('/login')
                            message.success('See you again :)');
                        }}
                    ><Icon type="logout"></Icon> Logout
                    </a>
                </Menu.Item>
            </Menu>
        );


        const userLinks = (

            <div
                className={style.right_menu}
            >
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        <span
                            className={style.welcome}>{this.props.fullname}</span>
                        <Icon type="down"/>
                    </a>
                </Dropdown>
            </div>

        );

        return (
            <div id="header">
                <div className={style.header_top}>
                    <div className={style.top_left}>
                        <i className="glyphicon-headphones"><Headphone /></i>
                        <span className={style.sub}><strong>  QUESTION?</strong> CALL <span
                            className={style.primary}>555.111.9999</span></span>
                    </div>
                    <div className={style.top_right}>
                        {userLinks}
                    </div>
                </div>
                <div className={style.header_bot}>
                    <Link className={style.logo} to={'/'}>
                        Photosesh Logo
                    </Link>
                    <MainMenu className={style.main_menu} {...this.props}  />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fullname:state.auth.user.name.firstName + state.auth.user.name.lastName
    }
}
export default connect(mapStateToProps, {logout})(Header)
