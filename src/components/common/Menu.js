/**
 * Created by lamtanphiho on 8/8/2017.
 */

import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import Authenticate from '../userProfile/authenticate'
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
                <Menu.Item>
                    <Authenticate />
                </Menu.Item>
            </Menu>
        );
    }
}
export default MainMenu;