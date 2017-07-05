import React,{Component} from 'react'
import {connect} from 'react-redux'
import { fetchGames, deleteGame } from '../actions';

import ListGame from './ListGame'

class GamePage extends Component{

    componentDidMount() {
        this.props.fetchGames();
    }

    render(){
        return (
            <div>
                <ListGame games={this.props.games} deleteGame={deleteGame} />
            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        games:state.games
    }
}

export default connect(mapStateToProps,{fetchGames,deleteGame})(GamePage)