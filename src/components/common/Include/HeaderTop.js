import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Dropdown, Icon, message} from 'antd';
import Headphone from 'react-icons/lib/ti/headphones'
import {logout} from '../../../actions/authActions'
import PropTypes from 'prop-types';
import style from './header_top.css';

class HeaderTop extends Component {

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
                <Menu.Divider />
                <Menu.Item key="1"
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
                <Dropdown overlay={menu} trigger={['click']}  placement="bottomLeft">
                    <a className="ant-dropdown-link" href="#">
                        <span
                            className={style.welcome}>{this.props.fullname}</span>
                        <Icon type="down"/>
                    </a>
                </Dropdown>
            </div>

        );

        return (

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


        );
    }
}

HeaderTop.propTypes = {
    logout: PropTypes.func.isRequired,
    fullname: PropTypes.string.isRequired
}



export default HeaderTop