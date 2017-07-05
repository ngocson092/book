import axios from 'axios'

export const  SET_GAME ='SET_GAME'
export const  ADD_GAME ='ADD_GAME'
export const  DELETE_GAME ='DELETE_GAME'

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
    return dispatch => {
        return axios.post('http://localhost:3001/api/games',game)
    }
}

export function deleteGame (id) {
    return dispatch => {
        axios.delete('http://localhost:3001/api/games/',{id})
            .then(game=>{
                dispatch({
                    type:DELETE_GAME,
                    game
                })
            })
    }
}
