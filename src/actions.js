import axios from 'axios'

export const SET_GAME ='SET_GAME'

export const setGame = (game)=>{
    return {
        type: SET_GAME,
        game
    }
}

export function fetchGames () {
    return dispatch => {

        axios.get('http://localhost:3001/api/games')
            .then(data=>dispatch(setGame(data.game)))

    }


}