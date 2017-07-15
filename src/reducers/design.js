
import {SET_ANGLE_COLOR} from '../actions'


export default function design(state = [],action = {}) {

    switch (action.type) {
        case SET_ANGLE_COLOR:
            return {...state,angles:action.color}

        default:
            return state
    }

}