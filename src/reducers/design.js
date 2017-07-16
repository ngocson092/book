
import {SET_ANGLE_COLOR,INIT_ANGLE_COLOR,SET_ACTIVE_ANGLE,ANGLES} from '../actions'



export default function design(state = {},action = {}) {

    switch (action.type) {
        case INIT_ANGLE_COLOR:
            return {...state,angles:action.data}

        case SET_ANGLE_COLOR:

            let angles = Object.assign({},state.angles)

            ANGLES.forEach(angle=>{
                angles[angle][action.data.part_type][action.data.part_name] = action.data.color
            })


            return {...state,angles}
        case SET_ACTIVE_ANGLE:
            return {...state,angle_active:action.angle}

        default:
            return state
    }

}