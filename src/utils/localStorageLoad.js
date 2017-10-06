import {setCurrentUser,verifyToken} from '../actions/authActions'
import {prepareTypeDataBooking} from '../actions/bookActions'
import setAuthorizationToken from '../utils/setAuthorizationToken'

import * as crypt from './crypt'

export default function (store) {
    try {

        if (localStorage.access_token) {

            setAuthorizationToken(localStorage.access_token);

            verifyToken()
            .then(res=>{
                let user = res.data.data;
                store.dispatch(setCurrentUser(user));
            },({response})=>{
                localStorage.removeItem('access_token');
                window.location.href = '/'
            })

        }


        if (localStorage.bookinfo) {
            let data_booking = JSON.parse(crypt.decode(localStorage.bookinfo))
            store.dispatch(prepareTypeDataBooking(data_booking));
        }

        return;
    } catch (e) {
        // Unable to load or parse stored state, proceed as usual
    }
}