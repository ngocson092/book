import style from './dashboard_wrapper.css'

import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom'
import {Row, Form} from 'antd';
import {connect} from 'react-redux'
import { Layout, Menu, Icon,Avatar } from 'antd';
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import PaymentCredit from './PaymentCredit'
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


                <HeaderTop {...this.props} />



                <Layout>
                    <Sider width={300} style={{  background: 'white', borderRight: '1px solid #dedede' ,height:'calc( 100vh  - 41px ) '}}>

                        <div className={style.header_user}>
                            <p> {(this.props.avatar == '') ? ( <Avatar className={style.avatar}   style={{width:60,height:60}} icon="user" />) : (<Avatar  style={{width:60,height:60}} className={style.avatar} src={this.props.avatar} />)} </p>

                            <span style={{fontSize:14}}>{this.props.fullname}</span>

                        </div>

                        <Menu
                            defaultSelectedKeys={[]}
                            mode="inline"
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="orders"><Link to="/settings/profile"><Icon type="contacts" /> Edit Profile</Link></Menu.Item>
                            <Menu.Item key="change-password"><Link to="/settings/change-password"><Icon type="qrcode" /> Change Password</Link></Menu.Item>
                            <Menu.Item key="bank-detail"><Link to="/settings/payment-credits"><Icon type="credit-card" /> Payment & Credits</Link></Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="homepage"><Link to="/"><Icon type="home" /> Back to Home</Link></Menu.Item>

                        </Menu>

                    </Sider>

                    <Layout style={{height:'calc( 100vh  - 41px ) ' ,background:'#e9ebee'}}>
                        <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
                            <Route  exact={true}  path={`${this.props.match.url}/`} component={Profile}/>
                            <Route  exact={true}  path={`${this.props.match.url}/profile`} component={Profile}/>
                            <Route  exact={true}  path={`${this.props.match.url}/change-password`} component={ChangePassword}/>
                            <Route   path={`${this.props.match.url}/payment-credits`} component={PaymentCredit}/>
                        </Content>
                    </Layout>

                </Layout>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fullname:state.auth.user.name.firstName + ' ' + state.auth.user.name.lastName,
        avatar: (state.auth.user.profilePicURL.thumb != '')?state.auth.user.profilePicURL.thumb:''
    }
}
export default connect(mapStateToProps, {logout})(DashboardWrapper)



