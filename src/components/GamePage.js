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
                <ListGame games={this.props.games} />
            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        games:state.games
    }
}

export default connect(mapStateToProps,{fetchGames})(GamePage)