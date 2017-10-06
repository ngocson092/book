import {SET_INFO_STEP_ONE,SET_BOOKTYPE, SET_EVENT_LIST,SET_PHOTOSESH_TYPE_NAME,SET_PHOTOSESH_EVENT_TYPE,SET_DATA_BOOKING} from '../actions/types'
import {NOW,TIME,DURATIONS} from '../define'
import moment from 'moment'

const default_state = {
    book_type:NOW,
    info:{
        duration:DURATIONS[0],
        date:moment(),
        from:TIME[0],
        to:TIME[1],
        photosesh_type_name:'',
        photosesh_event_type:'',
        photographer:{},
        place:'',
        position:{}
    }

}

export default function bookinfo(state = default_state,action = {}) {

    switch (action.type) {
        case SET_BOOKTYPE:
            return  {...state,book_type:action.data}
        case SET_DATA_BOOKING:
        {
            return action.data
        }

        case SET_PHOTOSESH_TYPE_NAME:
        {
            let {info} = state
            info.photosesh_type_name  = action.photosesh_type_name
            return {...state,info}
        }

        case SET_PHOTOSESH_EVENT_TYPE:
        {
            let {info} = state
            info.photosesh_event_type  = action.photosesh_event_type
            return {...state,info}
        }

        default:
            return state
    }

}