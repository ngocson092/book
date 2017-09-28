/**
 * Created by lamtanphiho on 8/8/2017.
 */
import style from './menu.css'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { Menu} from 'antd';

import PropTypes from 'prop-types'



class MainMenu extends React.Component {
    state = {
        current: 'mail'
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    goTo = (route)=>{this.props.history.replace(route)}

    render() {

        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={style.ant_menu}
            >
                <Menu.Item>
                    <Link to="/wedding" className="btn">WEDDING</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/book-now" className="btn">BOOK NOW</Link>
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
export default connect(mapStateToProps, {})(MainMenu);
