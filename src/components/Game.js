import React from 'react'

export default function Game({game,deleteGame}) {

    const Game = (
        <div className="box pt-card pt-elevation-0 pt-interactive">
            <img src={game.url} alt=""/>
            <h5><a href="#">{game.title}</a></h5>
            <button
                onClick={()=>{deleteGame(game._id)}}
                type="button" className="pt-button pt-large">
                Delete
                <span className="pt-icon-standard pt-icon-cross pt-align-right"></span>
            </button>
        </div>
    )

    return Game
}

Game.propTypes = {
    game:React.PropTypes.object.isRequired,
    deleteGame: React.PropTypes.func.isRequired
}