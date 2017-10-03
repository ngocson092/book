import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon,Button } from 'antd';
import axios from 'axios';
import {API_URL} from '../../../actions/authActions'
import AddCardForm from './Include/AddCardForm'

const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class CreditSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards:[]
        }
    }
    goTo(route) {
        this.props.history.replace(`${route}`)
    }

    componentWillMount(){

        axios.get(API_URL + '/user/getCredits')
            .then(res=>{
                console.log(res.data);
            })


    }
    render() {

        return (
            <div>
                CreditSection
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user:state.auth.user
    }
}
export default connect(mapStateToProps, {})(CreditSection)



