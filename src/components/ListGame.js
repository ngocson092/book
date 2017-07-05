import React from 'react'
import Game from './Game'

export default function ListGame({games}) {


    const ListGame = (

        <div className="container">
            { games.map(game=> <Game game={game} />)}
        </div>

    )

    return (
        <div>
            { (games.length == 0)?'no games found'  : ListGame }
        </div>

    )

}

ListGame.PropTypes = {
    games:React.PropTypes.array.isRequired
}
