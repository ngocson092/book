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
