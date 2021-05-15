
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Map from "./Map";
import Scenario1 from "./scenarios/Scenario1";
import Scenario2 from "./scenarios/Scenario2";
//import logo from './logo.svg';
import SidePanel from "./components/SidePanel";
import { Layout } from 'antd';

//import './App.css';

export default function App() {
  return (
    
    <Router>
      
      <Switch>
        <Route exact path="/"><Map/></Route>
        <Route path="/scenario1"><Scenario1/></Route>
        <Route path="/scenario2"><Scenario2/></Route>
      </Switch>
      
    </Router>
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

