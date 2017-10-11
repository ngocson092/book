import axios from 'axios';
import {SET_PROJECTS,SET_FILTER_STATUS,SET_SHOW_MODE} from './types'

const API_URL = process.env.API_URL;


export function getProjects(offset = 420) {
    return dispatch => {
        axios.get(API_URL + '/booking/user/getAllAppointments',
            {
                params:{offset}
            }).then(res=>{
            if (res.data.data) {

                let data = [...res.data.data['pastAppointment'],...res.data.data['upcomingAppointment']];
                dispatch({
                    type:SET_PROJECTS,
                    data
                });
            }
        })
    }

}

export function setFilterStatus(status) {
    return dispatch => {
        dispatch({
            type:SET_FILTER_STATUS,
            status
        });
    }
}
export function setShowMode(mode) {
    return dispatch => {
        dispatch({
            type:SET_SHOW_MODE,
            mode
        });
    }

}