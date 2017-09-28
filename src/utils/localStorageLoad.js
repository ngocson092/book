import {setCurrentUser,verifyToken} from '../actions/authActions'
import setAuthorizationToken from '../utils/setAuthorizationToken'


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
        return;
    } catch (e) {
        // Unable to load or parse stored state, proceed as usual
    }
}