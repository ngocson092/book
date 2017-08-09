import '../../stylesheet/_layout_booknow.scss'
import React from 'react'
import {Link} from 'react-router-dom'
import {Layout} from 'antd'
const { Content,Header} = Layout;

const LayoutBooknow = ({ children }) => (
    <Layout id="layout-booknow">
        <Content id="content">
            {children}
        </Content>
    </Layout>
);


export default LayoutBooknow
