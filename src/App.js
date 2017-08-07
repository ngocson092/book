import React, { Component } from 'react';
import Home from './components/Home';
import ChooseAddress from './components/Steps/ChooseAddress';
import {Route,Link} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
const { Header, Content } = Layout;


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) => {

        this.setState({
            current: e.key,
        });
    }
  render() {

    return (
        <Layout>
            <Header id="header">
                <div className="logo"><Link to={'/'}>Book Now</Link></div>
            </Header>
            <Content id="content">
                <div>
                    <Route path="/" component={ChooseAddress} exact={true} />
                </div>
            </Content>
        </Layout>
    );
  }
}

export default App;
