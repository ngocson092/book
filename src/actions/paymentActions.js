import axios from 'axios';
const API_URL = process.env.API_URL;


export function getPaymentToken() {
    return axios.get(API_URL + '/payment/user/paymentToken',
        {
            params:  {accessToken:axios.defaults.headers.common['authorization']}
        })
}