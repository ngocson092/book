import React from 'react'
import Game from './Game'

export default function ListGame({games,deleteGame}) {


    const ListGame = (

        <div className="container">
            { games.map(game=> <Game game={game} deleteGame={deleteGame} />)}
        </div>

    )

    return (
        <div>
            { (games.length == 0)?'no games found'  : ListGame }
        </div>

    )

}

ListGame.PropTypes = {
    games:React.PropTypes.array.isRequired,
    deleteGame: React.PropTypes.func.isRequired
}
