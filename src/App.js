import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import LayoutMaster from './components/Layout/LayoutMaster'
import LayoutBookNow from './components/Layout/LayoutBookNow'
import LayoutEmptyWrapper from './components/Layout/EmptyWrapper'
import DashboardWrapper from './components/userProfile/Dashboard/DashboardWrapper'
import Login from './components/userProfile/Login/LoginPage'
import Signup from './components/userProfile/Signup/SignupPage'
import Step1 from './components/Steps/ChooseAddress'
import Step2 from './components/Steps/PhotoseshType'
import Step3a from './components/Steps/DetailPhotoseshLight';
import Step4 from './components/Steps/NeedAPhotoSesh';
import Step5 from './components/Steps/photographers';
import Step6 from './components/Steps/BookingReview';
import Home from './components/Home/Home';
import Bookings from './components/bookings/index'


import requireAuth from './utils/requireAuth'


const LayoutMasterAuthorize = requireAuth(LayoutMaster)
const LayoutBookNowAuthorize = requireAuth(LayoutBookNow)
const LayoutEmptyWrapperAuthorize = requireAuth(LayoutEmptyWrapper)

class App extends Component {
    constructor(props) {
        super(props);
    }
    generateLayout = (props, Layout, Component) => (<Layout {...props}><Component  {...props} /></Layout>)
    render() {
        return (
            <Switch>
                <Route exact path="/login" render={(props)=> this.generateLayout(props,Login, '')} />
                <Route exact path="/signup" render={(props)=> this.generateLayout(props,Signup, '')} />
                <Route exact={true} path="/" render={(props)=> this.generateLayout(props,LayoutMasterAuthorize,Home)} />
                <Route exact={true} path="/book-now" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Step1)} />
                <Route exact={true} path="/book-now/photosesh-type" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Step2)} />
                <Route exact={true} path="/book-now/photosesh-type/detail" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Step3a)} />
                <Route exact={true} path="/book-now/need-a-photosesh" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Step4)} />
                <Route exact={true} path="/book-now/photographers" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Step5)} />
                <Route exact={true} path="/book-now/booking-review" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Step6)} />

                <Route path="/my-account"
                       render={(props)=> this.generateLayout(props, LayoutEmptyWrapperAuthorize, DashboardWrapper)}/>

                <Route exact={true} path="/bookings" render={(props)=> this.generateLayout(props,LayoutBookNowAuthorize,Bookings)} />
                <Redirect to="/"/>
            </Switch>
        );
    }
}

export default App;
