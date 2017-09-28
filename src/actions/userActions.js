import axios from 'axios';

import {SET_CURRENT_USER} from './types';
const API_URL = process.env.API_URL;

export function userSignupRequest(userData) {

    return axios.post(API_URL+'/api/users', userData);

}
