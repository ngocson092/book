import style from './dashboard_wrapper.css'

import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import HeaderTop from '../../common/Include/HeaderTop'
import {logout} from '../../../actions/authActions'


const {  Content, Sider } = Layout;
const FormItem = Form.Item;


class DashboardWrapper extends Component {
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
            <div id="user-dashboard">


                <HeaderTop
                    logout={this.props.logout}
                    fullname={this.props.fullname}
                    history={this.props.history}

                ></HeaderTop>



                <Layout>
                    <Sider width={300} style={{  background: '#fdfdfd', borderRight: '1px solid #f1f1f1' ,height:'calc( 100vh  - 41px ) '}}>

                        <div className={style.header_user}>
                            <p><Icon type="user" /></p>

                            <span>{this.props.fullname}</span>

                        </div>

                        <Menu
                            defaultSelectedKeys={[]}
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="orders"><Link to="/my-account/profile">Edit Profile</Link></Menu.Item>
                            <Menu.Item key="change-password"><Link to="/my-account/change-password">Change Password</Link></Menu.Item>
                            <Menu.Item key="homepage"><Link to="/">HomePage</Link></Menu.Item>

                        </Menu>

                    </Sider>

                    <Layout style={{height:'calc( 100vh  - 41px ) '}}>
                        <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
                            <Route  exact={true}  path={`${this.props.match.url}/`} component={Profile}/>
                            <Route  exact={true}  path={`${this.props.match.url}/profile`} component={Profile}/>
                            <Route  exact={true}  path={`${this.props.match.url}/change-password`} component={ChangePassword}/>
                        </Content>
                    </Layout>

                </Layout>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fullname:state.auth.user.name.firstName + state.auth.user.name.lastName
    }
}
export default connect(mapStateToProps, {logout})(DashboardWrapper)



