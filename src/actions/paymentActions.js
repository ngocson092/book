import axios from 'axios';
const API_URL = process.env.API_URL;


export function getPaymentToken() {
    return axios.get(API_URL + '/payment/user/paymentToken',
        {
            params:  {accessToken:axios.defaults.headers.common['authorization']}
        })
}
export function getCards() {
    return axios.get(API_URL + '/payment/user/getCards',
        {
            params:  {accessToken:axios.defaults.headers.common['authorization']}
        })
}
export function addCard(nounce) {
    return axios.post(API_URL + '/payment/user/nounce?accessToken=' + axios.defaults.headers.common['authorization'],{nounce})
}