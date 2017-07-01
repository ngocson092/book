import React,{Component} from 'react'
import {connect} from 'react-redux'
import { fetchGames, deleteGame } from '../actions';
class GamePage extends Component{

    componentDidMount() {
        this.props.fetchGames();
    }

    render(){
        return (
            <p>List Game</p>
        )
    }

}

const mapStateToProps = (state)=>{
    return {
        games:state.games
    }
}

export default connect(mapStateToProps,{fetchGames})(GamePage)