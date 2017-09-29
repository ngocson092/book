import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
import ProfileForm from './Include/EditProfileForm'

const {  Content, Sider } = Layout;
const FormItem = Form.Item;

class Profile extends Component {
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
            <div>
                <h2 className="head-title">Edit Profile</h2>
                <ProfileForm user={this.props.user} />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user:state.auth.user
    }
}
export default connect(mapStateToProps, {})(Profile)



