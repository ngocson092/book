
import {SET_GAME,ADD_GAME,DELETE_GAME} from '../actions'


export default function games(state = [],action = {}) {

    switch (action.type) {
        case DELETE_GAME:
            return state.filter(v=>{
                return v._id != action.game._id
            })
        case ADD_GAME:
            return [...state,action.game]
        case SET_GAME:
            return action.games

        default:
            return state
    }

}