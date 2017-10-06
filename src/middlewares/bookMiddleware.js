import * as crypt from '../utils/crypt'
import {SET_DATA_BOOKING} from '../actions/types'

export default store => next => action => {
    const { type } = action;

    if (type === SET_DATA_BOOKING) {
        let data_booking =  action.data
        localStorage.setItem('bookinfo', crypt.encode(JSON.stringify(data_booking)));
    }

    next(action);

}