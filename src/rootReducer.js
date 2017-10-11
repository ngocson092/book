import {combineReducers} from 'redux'
import bookinfo from './reducers/bookinfo'
import auth from './reducers/auth'
import payment from './reducers/payment'
import bookings from './reducers/bookings'

export default combineReducers({bookinfo,auth,payment,bookings})