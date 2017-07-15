import React, { Component } from 'react';
import ChooseModel from './components/Test/ChooseModel';
import Design from './components/Test/Design';
import {Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (

        <div id="content">
            <Route path="/" component={ChooseModel} exact={true} />
            <Route path="/design/:model"  component={Design} />
        </div>

    );
  }
}

export default App;
