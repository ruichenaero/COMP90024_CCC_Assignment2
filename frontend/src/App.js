
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Map from "./Map";
import Scenario1 from "./scenarios/Scenario1";
import Scenario2 from "./scenarios/Scenario2";
import Scenario3 from "./scenarios/Scenario3";
import Statistic1 from "./scenarios/Statistic1";
import Statistic2 from "./scenarios/Statistic2";
import Statistic3 from "./scenarios/Statistic3";
import Scenario4 from "./scenarios/Scenario4";
import Scenario5 from "./scenarios/Scenario5";
import Scenario6 from "./scenarios/Scenario6";
import Statistic4 from "./scenarios/Statistic4";
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
        <Route path="/scenario3"><Scenario3/></Route>
        <Route path="/scenario4"><Scenario4/></Route>
        <Route path="/scenario5"><Scenario5/></Route>
        <Route path="/scenario6"><Scenario6/></Route>
        <Route path="/statistic1"><Statistic1/></Route>
        <Route path="/statistic2"><Statistic2/></Route>
        <Route path="/statistic3"><Statistic3/></Route>
        <Route path="/statistic4"><Statistic4/></Route>
      </Switch>
      
    </Router>
    
  );
}

