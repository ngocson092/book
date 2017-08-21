import './stylesheet/_common.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom';
import rootReducers from './rootReducer'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
const request   = require('request');
const qs        = require('querystring');

const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
request.post(process.env.API_URL+'/user/login', {
    form: {
        emailId     : "demoweb@gmail.com",
        password    : "123123",
        deviceType  : "IOS",
        deviceToken : "1"
    }
}, function (error, response, body) {console.log(error)
    if(!error){

        body = JSON.parse(body);console.log(body)
        localStorage.setItem("user", JSON.stringify(body.data));
    }

});

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </LocaleProvider>
    ,
    document.getElementById('root')
);

