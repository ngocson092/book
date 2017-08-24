import '../../stylesheet/_layout_booknow.scss'
import React from 'react'
import {Redirect} from 'react-router-dom'
import {Layout} from 'antd'
const { Content,Header} = Layout;

let user = localStorage.getItem("user");
let isLogin = true;
if (user == 'undefined' || user == null) {
    isLogin = false;
}
const LayoutBooknow = ({ children }) => (
    <Layout id="layout-booknow">
        {!isLogin && ( <Redirect to={'/login'}/>)}
        <Content id="content">
            {children}
        </Content>
    </Layout>
);


export default LayoutBooknow
