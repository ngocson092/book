import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form,Alert} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon,Button } from 'antd';
import axios from 'axios';
import AddCardForm from './Include/AddCardForm'

const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class AddCardSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards:[]
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }



    render() {

        return (
            <div>
                <AddCardForm></AddCardForm>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user:state.auth.user
    }
}
export default connect(mapStateToProps, {})(AddCardSection)



