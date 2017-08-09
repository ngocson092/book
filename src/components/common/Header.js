/**
 * Created by lamtanphiho on 8/8/2017.
 */
import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import MainMenu from './Menu';
import {Layout} from 'antd'
import Headphone from 'react-icons/lib/ti/headphones'

class Header extends Component {
    render() {

        return (
            <div id="header">
                <div className="header-top">
                    <i className="glyphicon-headphones"><Headphone /></i>
                    <span className="sub"><strong>  QUESTION?</strong> CALL <span className="primary">555.111.9999</span></span>
                </div>
                <div className="header-bot">
                    <Link className="logo" to={'/'}>
                        Photosesh Logo
                    </Link>
                    <MainMenu className="main-menu" />
                </div>
            </div>
        );
    }
}

export default Header;
