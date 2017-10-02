import axios from 'axios';

import {SET_CURRENT_USER} from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const API_URL = process.env.API_URL;
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {

        localStorage.removeItem('access_token');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}


export function login(data) {
    return axios.post(API_URL + '/user/login', data)
}


export function verifyToken() {
    return axios.get(API_URL + '/user/verify-token')
}



export function setToken(token,user) {
    return dispatch => {
        localStorage.setItem('access_token', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(user));
    }
}
