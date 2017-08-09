import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import LayoutMaster from './components/Layout/LayoutMaster'
import LayoutBookNow from './components/Layout/LayoutBookNow'
import Step1 from './components/Steps/ChooseAddress'
import Step2 from './components/Steps/PhotoseshType'
import Home from './components/Home'


const generateLayout = (Layout,Component)=>{
    return (<Layout><Component/></Layout>)
}

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={()=> generateLayout(LayoutMaster,Home)} />
                <Route exact={true} path="/book-now" render={()=> generateLayout(LayoutBookNow,Step1)} />
                <Route exact={true} path="/book-now/step2" render={()=> generateLayout(LayoutBookNow,Step2)} />
            </Switch>
        );
    }
}

export default App;
