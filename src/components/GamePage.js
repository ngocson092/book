import React,{Component} from 'react'
import {connect} from 'react-redux'
import { fetchGames, deleteGame } from '../actions';

import ListGame from './ListGame'
import Loading from './Loading'

class GamePage extends Component{

    state = {
        loading:false
    }

    componentDidMount() {
        this.setState({loading:true})
        this.props
            .fetchGames()
            .then(()=>{
                this.setState({loading:false})
            });
    }

    render(){
        return (
            <div>
                {(this.state.loading) && <div><Loading></Loading></div>}
                <ListGame games={this.props.games} deleteGame={this.props.deleteGame}  />
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