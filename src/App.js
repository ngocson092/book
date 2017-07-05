import React, { Component } from 'react';
import GamePage from './components/GamePage';
import AddGame from './components/AddGame';
import {Link,Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (

        <div>

            <nav className="pt-navbar pt-dark">
                <div className="pt-navbar-group pt-align-left">
                    <div className="pt-navbar-heading"> <Link to="/">Redux</Link></div>
                    <input className="pt-input" placeholder="Search files..." type="text" />
                </div>
                <div className="pt-navbar-group pt-align-right">

                    <Link className="pt-button pt-minimal pt-icon-home"  to="/">Home</Link>
                    <Link  className="pt-button pt-minimal pt-icon-grid-view" to="/games">Games</Link>
                    <Link  className="pt-button pt-minimal pt-icon-grid-view" to="/add-game">Add Game</Link>
                    <span className="pt-navbar-divider"></span>
                    <button className="pt-button pt-minimal pt-icon-user"></button>
                    <button className="pt-button pt-minimal pt-icon-notifications"></button>
                    <button className="pt-button pt-minimal pt-icon-cog"></button>
                </div>
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
