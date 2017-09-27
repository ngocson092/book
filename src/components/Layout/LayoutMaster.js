import '../../stylesheet/_layout_master.scss'
import React from 'react'
import {Layout} from 'antd'
import MainHeader from '../common/Header'
const { Content} = Layout;


const LayoutMaster = ({ children }) => (
    <Layout id="layout-master">
        <MainHeader />
        <Content id="content">
            {children}
        </Content>
    </Layout>
);
export default LayoutMaster

