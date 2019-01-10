import React, { Component } from 'react';
import './scss/App.scss';
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Sidebar></Sidebar>
            <Dashboard></Dashboard>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
