import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {MainView} from './app/views/MainView.js';
import {BrowserRouter as Router} from 'react-router-dom';


class App extends Component {
  render() {
    return (

      <div>

        <Router>
          <div>
            <MainView/>

          </div>
        </Router>

      </div>
    );
  }
}

export default App;
