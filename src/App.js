import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LayoutMaster from './components/Layout/LayoutMaster'
import LayoutBookNow from './components/Layout/LayoutBookNow'
import LayoutEmptyWrapper from './components/Layout/EmptyWrapper'
import DashboardWrapper from './components/Settings/Dashboard/DashboardWrapper'
import Forgot from './components/Settings/Login/ForgotPassword'
import Login from './components/Settings/Login/LoginPage'
import Signup from './components/Settings/Signup/SignupPage'
import BookingWrapper from './components/Steps/BookingWrapper'
import ProjectsWrapper from './components/Projects/ProjectsWrapper'


import requireAuth from './utils/requireAuth'
import ReloadAnimate from './components/common/Include/ReloadAnimate';

const LayoutMasterAuthorize = requireAuth(LayoutMaster)
const LayoutBookNowAuthorize = requireAuth(LayoutBookNow)
const LayoutEmptyWrapperAuthorize = requireAuth(LayoutEmptyWrapper)

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reload:false
        }
        this.props.history.listen((location, action) => {
            this.setState({reload:true})
            setTimeout(()=>{ this.setState({reload:false}) },700)
        });
    }
    generateLayout = (props, Layout, Component) => (<Layout {...props}><Component  {...props} /></Layout>)

    render() {
        return (
            <div>

                {this.state.reload && (<ReloadAnimate/>)}

                <Switch>
                    <Route exact path="/forgot" render={(props)=> this.generateLayout(props,Forgot, '')} />
                    <Route exact path="/login" render={(props)=> this.generateLayout(props,Login, '')} />
                    <Route exact path="/signup" render={(props)=> this.generateLayout(props,Signup, '')} />


                    <Route path="/book" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,BookingWrapper)} />
                    <Route path="/settings" render={(props)=> this.generateLayout(props, LayoutMasterAuthorize, DashboardWrapper)}/>

                    <Route exact={true} path="/" render={(props)=> this.generateLayout(props,LayoutMasterAuthorize,ProjectsWrapper)} />
                    <Route path="/projects" render={(props)=> this.generateLayout(props,LayoutMasterAuthorize,ProjectsWrapper)} />
                    <Redirect to="/"/>
                </Switch>
            </div>

        );
    }
}

export default App;
