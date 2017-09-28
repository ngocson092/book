import style from './layoutmaster.css'
import React from 'react'
import {Layout} from 'antd'
import MainHeader from '../common/Header'
const { Content} = Layout;


const LayoutMaster = ({ children }) => (
    <Layout className={style.layout_master}>
        <MainHeader {...children.props} />
        <Content id="content">
            {children}
        </Content>
    </Layout>
);
export default LayoutMaster

