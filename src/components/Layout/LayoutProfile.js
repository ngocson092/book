import style from './layoutmaster.css'
import React from 'react'
import {Layout} from 'antd'
import HeaderTop from '../common/Include/HeaderTop'
const { Content} = Layout;


const LayoutProfile = ({ children }) => (
    <Layout className={style.layout_master}>
        <HeaderTop {...children.props} />
        <Content id="content">
            {children}
        </Content>
    </Layout>
);
export default LayoutProfile

