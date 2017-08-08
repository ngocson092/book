/**
 * Created by lamtanphiho on 8/8/2017.
 */
import '../../stylesheet/header.scss';

import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Sider from './Menu';
import {Layout} from 'antd'
import Headphone from 'react-icons/lib/ti/headphones'
const {Header, Content} = Layout;


class Headerr extends Component {
    render() {

        return (
            <div id="header">
                <div className="header-top">
                    <i className="glyphicon-headphones"><Headphone /></i>
                    <span className="sub"><strong>  QUESTION?</strong> CALL <span className="red">555.111.9999</span></span>
                </div>
                <div className="header-bot">
                    <Link to={'/'}>
                        <img className="logo logo-dark" alt="Classic Photographers" src="http://classicphotographers.com/wp-2016/wp-content/themes/cp2016_pixon/img/2016_cp_logo.png" />
                    </Link>
                    <Sider />
                </div>
            </div>
        );
    }
}

export default Headerr;
