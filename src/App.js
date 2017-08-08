import React, {Component} from 'react';
import ChooseAddress from './components/Steps/ChooseAddress';
import Home from './components/Home';
import Header from './components/common/Header';
import {Route, Link} from 'react-router-dom'
import {Layout} from 'antd'
const { Content} = Layout;


class App extends Component {
    state = {
        current: 'mail',
    }

    render() {

        return (
            <Layout>
                <Header />
                <Content id="content">
                    <div>
                        <Route path="/" component={Home} exact={true}/>
                        <Route path="/book-now" component={ChooseAddress}/>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default App;
