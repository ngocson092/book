import {SET_INFO_STEP_ONE,SET_BOOKTYPE, SET_EVENT_LIST} from '../actions'
import {NOW,TIME,DURATIONS} from '../define'
import moment from 'moment'

const default_state = {
    book_type:NOW,
    info:{
        duration:DURATIONS[0],
        date:moment(),
        from:TIME[0],
        to:TIME[1]
    }
}

export default function bookinfo(state = {},action = {}) {

    switch (action.type) {
        case SET_BOOKTYPE:
            let new_data = {...state}
            new_data.book_type = action.data
            return new_data
        case SET_INFO_STEP_ONE:
            return action.data
        case SET_EVENT_LIST:
            return action.data
        default:
            return default_state
    }

}