import '../../stylesheet/_layout_master.scss'
import React from 'react'
import {Layout} from 'antd'
import MainHeader from '../common/Header'
import {Redirect} from 'react-router-dom'
const { Content} = Layout;

let user = localStorage.getItem("user");
let isLogin = true;
if (user == 'undefined' || user == null) {
   isLogin = false;
}

const LayoutMaster = ({ children }) => (
    <Layout id="layout-master">
        {!isLogin && ( <Redirect to={'/login'}/>)}
        <MainHeader />
        <Content id="content">
            {children}
        </Content>
    </Layout>
);
export default LayoutMaster

