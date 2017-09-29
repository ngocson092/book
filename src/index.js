import './stylesheet/_common.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom';
import rootReducers from './rootReducer'
import { LocaleProvider } from 'antd';
import localStorageLoad from './utils/localStorageLoad'
import enUS from 'antd/lib/locale-provider/en_US';

const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
localStorageLoad(store);

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    </LocaleProvider>
    ,
    document.getElementById('root')
);

