import style from './layoutmaster.css'
import React from 'react'
import {connect} from 'react-redux'

import {Layout} from 'antd'
const { Content} = Layout;
const EmptyWrapper = ({ children }) => (
    <Layout className={style.layout_master}>
        {children}
    </Layout>
);

export default EmptyWrapper

