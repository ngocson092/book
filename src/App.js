import React, { Component } from 'react';
import ChooseModel from './components/ChooseModel';
import Design from './components/Design';
import Home from './components/Home';
import {Route,Link} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
const { Header, Content } = Layout;
const Preload = require('react-preload').Preload

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
  render() {

    const loadingIndicator = (
        <div>
            <img src="http://www.arunachaluniversity.ac.in/wp-content/uploads/2017/03/ajax-loader.gif" alt=""/>
        </div>
    )
    return (
        <Layout>
            <Header>
                <div className="logo"><Link to={'/'}>AZCONA <span>SPORT</span></Link></div>

                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="mail">
                        <Icon type="star-o" />Infield
                    </Menu.Item>
                    <Menu.Item key="app">
                        <Icon type="heart" />Catcher
                    </Menu.Item>
                    <SubMenu title={<span><Icon type="windows" />Fastpitch Example</span>}>
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="as">
                        <Icon type="api" />Catcher
                    </Menu.Item>
                </Menu>
            </Header>
            <Content id="content">
                <Preload
                    loadingIndicator={loadingIndicator}
                    mountChildren
                    resolveOnError
                >
                    <div>
                        <Route path="/" component={Home} exact={true} />
                        <Route path="/select_model" component={ChooseModel} exact={true} />
                        <Route path="/design/:model"  component={Design} />
                    </div>
                </Preload>
            </Content>
        </Layout>
    );
  }
}

export default App;
