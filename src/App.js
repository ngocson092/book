import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import LayoutMaster from './components/Layout/LayoutMaster'
import LayoutBookNow from './components/Layout/LayoutBookNow'
import ChooseAddress from './components/Steps/ChooseAddress'
import Home from './components/Home'


const GenerateRoute = (Layout,Component)=>{
    return (<Layout><Component/></Layout>)
}

class App extends Component {
    render() {
        return (
            <Switch>
                {}
                <Route exact path="/" render={()=> GenerateRoute(LayoutMaster,Home)} />
                <Route path="/book-now" render={()=> GenerateRoute(LayoutBookNow,ChooseAddress)} />
            </Switch>
        );
    }
}

export default App;
