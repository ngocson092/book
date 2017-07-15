
import {SET_ANGLE_COLOR} from '../actions'
import {INIT_ANGLE_COLOR} from '../actions'
import {INCREASE} from '../actions'


export default function design(state = {},action = {}) {

    switch (action.type) {
        case INIT_ANGLE_COLOR:

            const angle_init = action.data
            return {...state,angles:angle_init}

        case SET_ANGLE_COLOR:

            const angles = (typeof state.angles != 'undefined') ?  state.angles : {}

            angles[action.data.angle][action.data.part_type][action.data.part_name] = action.data.color

            return {...state,angles}


        case INCREASE:

            return {...state,number:Math.random()}

        default:
            return state
    }

}