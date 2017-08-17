import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LayoutMaster from './components/Layout/LayoutMaster'
import LayoutBookNow from './components/Layout/LayoutBookNow'
import Step1 from './components/Steps/ChooseAddress'
import Step2 from './components/Steps/PhotoseshType'
import Step3a from './components/Steps/DetailPhotoseshLight';
import Step4 from './components/Steps/NeedAPhotoSesh';
import Step5 from './components/Steps/photographers';
import Home from './components/Home'
const request   = require('request');
const qs        = require('querystring');


const generateLayout = (Layout,Component)=>{
    return (<Layout><Component/></Layout>)
}

class App extends Component {
    constructor(props) {
        super(props);
        this.login();
    }
    login = function () {
        request.post(process.env.API_URL+'/user/login', {
            form: {
                emailId     : "demoapp@gmail.com",
                password    : "123123",
                deviceType  : "IOS",
                deviceToken : "1"
            }
        }, function (error, response, body) {
            if(!error){

                body = JSON.parse(body);console.log(body)
                localStorage.setItem("user", JSON.stringify(body.data));
            }

        });

    }
    render() {
        return (
            <Switch>
                <Route exact path="/" render={()=> generateLayout(LayoutMaster,Home)} />
                <Route exact={true} path="/book-now" render={()=> generateLayout(LayoutBookNow,Step1)} />
                <Route exact={true} path="/book-now/photosesh-type" render={()=> generateLayout(LayoutBookNow,Step2)} />
                <Route exact={true} path="/book-now/photosesh-type/detail" render={()=> generateLayout(LayoutBookNow,Step3a)} />
                <Route exact={true} path="/book-now/need-a-photosesh" render={()=> generateLayout(LayoutBookNow,Step4)} />
                <Route exact={true} path="/book-now/photographers" render={()=> generateLayout(LayoutBookNow,Step5)} />
            </Switch>
        );
    }
}

export default App;
