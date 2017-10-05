import axios from 'axios';
import {SET_CARDS,SET_CARD_DEFAULT,SET_CREDIT} from './types'

const API_URL = process.env.API_URL;


export function getPaymentToken() {
    return axios.get(API_URL + '/payment/user/paymentToken',
        {
            params:  {accessToken:axios.defaults.headers.common['authorization']}
        })
}
export function getCards() {

    return dispatch => {
        axios.get(API_URL + '/payment/user/getCards',
        {
            params:  {accessToken:axios.defaults.headers.common['authorization']}
        }).then(res=>{
            if (res.data.data) {
                let cards = res.data.data.allCards
                dispatch({
                    type:SET_CARDS,
                    data:cards
                });
            }
        })
    }

}
export function getCredits() {

    return dispatch => {
        axios.get(API_URL + '/user/getCredits').then(res=>{
            if (res.data.data) {
                dispatch({
                    type:SET_CREDIT,
                    credits:res.data.data.credits
                });
            }
        })
    }

}

export function setCardDefault(card_id) {

    return dispatch => {
        axios.put(API_URL + '/payment/user/paymentCard/default/' + card_id,
        {
            accessToken: axios.defaults.headers.common['authorization']
        }).then(res=>{
            if (res.data.data) {
                dispatch({
                    type:SET_CARD_DEFAULT,
                    id:card_id
                });
            }
        })
    }

}


export function addCard(nounce) {
    return axios.post(API_URL + '/payment/user/nounce?accessToken=' + axios.defaults.headers.common['authorization'],{nounce})
}
export function addCredits(promo) {
    return axios.get(API_URL + '/user/applyPromoCode',{params:{
        promoCode:promo,
        offset:0
    }})
}