import React, { Component } from 'react';
import ChooseModel from './components/Test/ChooseModel';
import Design from './components/Test/Design';
import {Link,Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (

        <div className="container">
            <div className="row" id="content">
                <Route path="/" component={ChooseModel} />
                <Route path="/design" component={Design} />
            </div>
        </div>

    );
  }
}

export default App;
