
import {SET_GAME} from '../actions'
import {ADD_GAME} from '../actions'


export default function games(state = [],action = {}) {

    switch (action.type) {

        case SET_GAME:
            return action.games
        default:
            return state
    }

}