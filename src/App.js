import React, {Component} from 'react';
import ChooseAddress from './components/Steps/ChooseAddress';
import {Route, Link} from 'react-router-dom'
import {Layout} from 'antd'
const {Header, Content} = Layout;


class App extends Component {
    state = {
        current: 'mail',
    }

    render() {

        return (
            <Layout>
                <Header id="header">
                    <div className="logo"><Link to={'/'}>Photosesh - Book Now</Link></div>
                </Header>
                <Content id="content">
                    <div>
                        <Route path="/" component={ChooseAddress} exact={true}/>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default App;
