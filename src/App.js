import React, { Component } from 'react';
import ChooseModel from './components/Test/ChooseModel';
import Design from './components/Test/Design';
import {Route,Link} from 'react-router-dom'
import { Layout } from 'antd'
const { Header, Content } = Layout;
const Preload = require('react-preload').Preload



class App extends Component {

  render() {


    const loadingIndicator = (<div>

        <img src="http://www.arunachaluniversity.ac.in/wp-content/uploads/2017/03/ajax-loader.gif" alt=""/>
        
    </div>)
    return (


        <Layout>
            <Header>
                <div className="logo"><Link to={'/'}><span>Your</span> Company</Link></div>
            </Header>
            <Content id="content">
                <Preload
                    loadingIndicator={loadingIndicator}
                    mountChildren
                    resolveOnError
                >
                    <div>
                        <Route path="/" component={ChooseModel} exact={true} />
                        <Route path="/design/:model"  component={Design} />
                    </div>



                </Preload>


            </Content>
        </Layout>
    );
  }
}

export default App;
