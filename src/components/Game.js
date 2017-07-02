import React from 'react'

import {Link,Route} from 'react-router-dom'
export default function Game({game}) {

    const Game = (
        <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
                <img className="img-responsive" src={game.url} alt="..."/>
                <div className="caption">
                    <h3>{game.title}</h3>
                    <p>
                        <Link to={'/game/'+game._id} className="btn btn-primary" role="button">View Detail</Link>
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