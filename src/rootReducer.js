import {combineReducers} from 'redux'
import bookinfo from './reducers/bookinfo'
import auth from './reducers/auth'

export default combineReducers({bookinfo,auth})