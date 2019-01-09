import React, { Component } from 'react';
import './scss/App.scss';

import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar></Sidebar>
        <Dashboard></Dashboard>
      </div>
    );
  }
}

export default App;
