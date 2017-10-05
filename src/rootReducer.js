import {combineReducers} from 'redux'
import bookinfo from './reducers/bookinfo'
import auth from './reducers/auth'
import card from './reducers/card'

export default combineReducers({bookinfo,auth,card})