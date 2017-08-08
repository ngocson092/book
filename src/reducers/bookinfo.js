import {SET_INFO_STEP_ONE} from '../actions'


export default function bookinfo(state = {},action = {}) {

    switch (action.type) {
        case SET_INFO_STEP_ONE:
            return action.data
        default:
            return state
    }

}