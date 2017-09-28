/**
 * Created by lamtanphiho on 8/8/2017.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route,Link} from 'react-router-dom'
import { Menu, Icon,message } from 'antd';
import {logout} from '../../actions/authActions'
import PropTypes from 'prop-types'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const request = require('../../controllers/request')

class MainMenu extends React.Component {
    state = {
        current: 'mail'
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    goTo = (route)=>{
      console.log(  this.props);

        this.props.history.replace(route)}

    render() {

        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item>
                    <Link to="/wedding" className="btn">WEDDING</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/book-now" className="btn">BOOK NOW</Link>
                </Menu.Item>

                <Menu.Item key="5"
                >
                    <div
                        onClick={() => {
                            this.props.logout();
                            this.goTo('/login')
                            message.success('See you again :)');
                        }}
                    ><Icon type="logout"></Icon> Logout
                    </div>
                </Menu.Item>
            </Menu>
        );
    }
}

MainMenu.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
export default connect(mapStateToProps, {logout})(MainMenu);
