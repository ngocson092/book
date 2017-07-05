import React from 'react'
import {Link,Route} from 'react-router-dom'

import * as Blueprint from "@blueprintjs/core"
export default function Game({game}) {
    const Game = (
        <div className="box pt-card pt-elevation-0 pt-interactive">
            <img src={game.url} alt=""/>
            <h5><a href="#">{game.title}</a></h5>
            <p>Overview of employee activity, including risk model, scores and scenario alert history.</p>
        </div>
    )

    return Game
}

Game.propTypes = {
    game:React.PropTypes.object.isRequired
}