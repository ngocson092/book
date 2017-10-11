import style from './layoutmaster.css'
import React from 'react'
import {Layout,Breadcrumb} from 'antd'
import LeftMenu from '../common/SideBar'
const { Content,Sider} = Layout;


const LayoutMaster = ({ children }) => (
    <Layout className={style.layout_master}>

        <Sider width={300} style={{  background: 'black', borderRight: '1px solid #dedede' ,height:'100vh',position: 'sticky',top: 0}}>
            <LeftMenu {...children.props} />
        </Sider>

        <Layout style={{height:'100vh' ,background:'#ffffff'}}>
            <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>

                <div className={style.breadcrumbs} style={{position: 'sticky',top: 0}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Bookings</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {children}
            </Content>
        </Layout>
    </Layout>
);
export default LayoutMaster

