import style from './change_password.css'

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }


    render() {
        return (
            <div>change pass</div>
        );
    }
}



const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, {})(ChangePassword)



