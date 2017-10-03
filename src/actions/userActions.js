import axios from 'axios';

import {SET_CURRENT_USER} from './types';
const API_URL = process.env.API_URL;

export function userSignupRequest(userData) {

    return axios({
        method:'post',
        url:API_URL+'/user/register',
        data:userData
    })

}
export function updateProfile(data) {

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    return axios.post(API_URL + '/user/updateProfile',data,config)
}
export function changePassword(data) {
    return axios.put(API_URL + '/user/changePassword',data)
}
