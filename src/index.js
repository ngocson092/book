import './index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom';
import rootReducers from './rootReducer'
const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);

