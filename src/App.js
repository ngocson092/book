import React, { Component } from 'react';
import GamePage from './components/GamePage';
import AddGame from './components/AddGame';
import {Link,Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (

        <div>
            <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
                <Link className="navbar-brand" to='/'>Redux</Link>
                <ul className="nav navbar-nav">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/games">Games</Link>
                    </li>
                    <li>
                        <Link to="/add-game">Add New Game</Link>
                    </li>
                </ul>
            </nav>


            <div className="container">
                <div className="row" id="content">
                    <Route path="/games" component={GamePage} />
                    <Route path="/add-game" component={AddGame} />
                </div>
            </div>


        </div>

    );
  }
}

export default App;