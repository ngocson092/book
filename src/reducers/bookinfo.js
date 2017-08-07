import {INIT_ANGLE_COLOR} from '../actions'


export default function design(state = {},action = {}) {

    switch (action.type) {
        case INIT_ANGLE_COLOR:
            return {...state,angles:action.data}

        default:
            return state
    }

}