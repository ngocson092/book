import {SET_INFO_STEP_ONE,SET_BOOKTYPE,SET_EVENT_LIST,SET_PHOTOSESH_TYPE_NAME,SET_PHOTOSESH_EVENT_TYPE,SET_DATA_BOOKING} from './types'
import axios from 'axios'
import qs from 'querystring'
const API_URL = process.env.API_URL

export function setDataBooking (data){
    return dispatch => {
        dispatch({
            type: SET_DATA_BOOKING,
            data
        })
    }
}

export function prepareTypeDataBooking(data) {
    return {
        type:SET_DATA_BOOKING,
        data
    }
}

export function getBookingCornerbookNow(data) {
   return axios.get(API_URL + '/bookingCorner/user/photoSeshNow?' + qs.stringify(data))
}

export function getBookingCornerBookLater(data) {
   return axios.get(API_URL + '/bookingCorner/user/photoSeshLater?' + qs.stringify(data))
}

export function postBooking(data) {
   return axios.post(API_URL + '/bookingCorner/bookAppointmentRequestMultiple',data)
}


export function setBooktype (booktype){
    return dispatch => {
        dispatch({
            type: SET_BOOKTYPE,
            data:booktype
        })
    }
}
export function setPhotoseshTypeName (photosesh_type_name){
    return dispatch => {
        dispatch({
            type: SET_PHOTOSESH_TYPE_NAME,
            photosesh_type_name
        })
    }
}
export function setPhotoseshEventType (photosesh_event_type){
    return dispatch => {
        dispatch({
            type: SET_PHOTOSESH_EVENT_TYPE,
            photosesh_event_type
        })
    }
}


export function setEventList (eventlist){
    return dispatch => {
        dispatch({
            type: SET_EVENT_LIST,
            data:eventlist
        })
    }
}
