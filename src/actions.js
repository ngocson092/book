import axios from 'axios'

export const  SET_GAME ='SET_GAME'
export const  ADD_GAME ='ADD_GAME'

const setGame = (games)=>{
    return {
        type: SET_GAME,
        games
    }
}

export function fetchGames () {
    return dispatch => {

        fetch('http://localhost:3001/api/games')
        .then(res=>res.json())
        .then(data=>{
            return dispatch(setGame(data))
        })

    }
}

export function storeGame (game) {
    console.log(game);
    axios.post('http://localhost:3001/api/games',{game})
}