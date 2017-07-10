import React from 'react'
import { Alert, Button, Intent, IToaster, Toaster } from "@blueprintjs/core";

export default function Game({game,deleteGame}) {
       let state = {
            isOpen: false,
            isOpenError: false,
       }

    const confirm = ()=>{

        state.isOpenError = true ;
        //deleteGame(game._id)
    }
    const handleCloseError = ()=>{
        //deleteGame(game._id)
    }

    const Game = (
        <div className="box pt-card pt-elevation-0 pt-interactive">
            <img src={game.url} alt=""/>
            <h5><a href="#">{game.title}</a></h5>
            <button
                onClick={this.confirm.bind()}
                type="button" className="pt-button pt-large">
                Delete
                <span className="pt-icon-standard pt-icon-cross pt-align-right"></span>
            </button>


            <div>
                <Alert
                    isOpen={state.isOpenError}
                    confirmButtonText="Okay"
                    onConfirm={handleCloseError}
                >
                    <p>
                        Couldn't create the file because the containing folder doesn't exist anymore.
                        You will be redirected to your user folder.
                    </p>
                </Alert>
            </div>

        </div>



    )

    return Game
}

Game.propTypes = {
    game:React.PropTypes.object.isRequired,
    deleteGame: React.PropTypes.func.isRequired
}