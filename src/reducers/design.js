
import {SET_ANGLE_COLOR} from '../actions'
import {INIT_ANGLE_COLOR} from '../actions'


export default function design(state = {},action = {}) {

    switch (action.type) {
        case INIT_ANGLE_COLOR:
            return {...state,angles:action.data}

        case SET_ANGLE_COLOR:

            let angles = Object.assign({},state.angles)
            angles[action.data.angle][action.data.part_type][action.data.part_name] = action.data.color
            return {angles}

        default:
            return state
    }

}