import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LayoutMaster from './components/Layout/LayoutMaster'
import LayoutBookNow from './components/Layout/LayoutBookNow'
import LoginPage from './components/userProfile/loginPage'
import Step1 from './components/Steps/ChooseAddress'
import Step2 from './components/Steps/PhotoseshType'
import Step3a from './components/Steps/DetailPhotoseshLight';
import Step4 from './components/Steps/NeedAPhotoSesh';
import Step5 from './components/Steps/photographers';
import Step6 from './components/Steps/BookingReview';
import Home from './components/Home'



const generateLayout = (Layout,Component)=>{
    return (<Layout><Component/></Layout>)
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" render={()=> generateLayout(LoginPage, '')} />
                <Route exact={true} path="/" render={()=> generateLayout(LayoutMaster,Home)} />
                <Route exact={true} path="/book-now" render={()=> generateLayout(LayoutBookNow,Step1)} />
                <Route exact={true} path="/book-now/photosesh-type" render={()=> generateLayout(LayoutBookNow,Step2)} />
                <Route exact={true} path="/book-now/photosesh-type/detail" render={()=> generateLayout(LayoutBookNow,Step3a)} />
                <Route exact={true} path="/book-now/need-a-photosesh" render={()=> generateLayout(LayoutBookNow,Step4)} />
                <Route exact={true} path="/book-now/photographers" render={()=> generateLayout(LayoutBookNow,Step5)} />
                <Route exact={true} path="/book-now/booking-review" render={()=> generateLayout(LayoutBookNow,Step6)} />
                {/*<Route exact={true} path="/login" render={()=> generateLayout(LayoutMaster,Login)} />*/}
            </Switch>
        );
    }
}

export default App;
