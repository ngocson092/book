import React from 'react'


export default function Game({game}) {

    const Game = (
        <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
                <img className="img-responsive" src={game.url} alt="..."/>
                <div className="caption">
                    <h3>{game.title}</h3>
                    <p>
                        <a href="#" className="btn btn-primary" role="button">View</a>
                        <a href="#" className="btn btn-default" role="button">Button</a>
                    </p>
                </div>
            </div>
        </div>
    )

    return Game
}

Game.propTypes = {
    game:React.PropTypes.object.isRequired
}