import '../../stylesheet/_layout_booknow.scss'
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {Layout} from 'antd'
const { Content,Header} = Layout;

const LayoutBooknow = ({ children }) => (
    <Layout id="layout-booknow">
        <Header id="header">
            <div className="logo"><Link to={'/'}>Photosesh - Book Now</Link></div>
        </Header>
        <Content id="content">
            {children}
        </Content>
    </Layout>
);
export default LayoutBooknow
