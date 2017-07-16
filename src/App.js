import React, { Component } from 'react';
import ChooseModel from './components/Test/ChooseModel';
import Design from './components/Test/Design';
import {Route,Link} from 'react-router-dom'

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  render() {
    return (
        <Layout>
            <Header>
                <div className="logo"><Link to={'/'}><span>Your</span> Company</Link></div>
            </Header>
            <Content id="content">
                <Route path="/" component={ChooseModel} exact={true} />
                <Route path="/design/:model"  component={Design} />
            </Content>
        </Layout>
    );
  }
}

export default App;
