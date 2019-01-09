import React, { Component } from 'react';

class Navbar extends Component {
  
  render() {

    return (
      <div className="navbar-container">
        <div className="nav-element">
            <a href="/dashboard">Dashboard</a>
        </div>
        <div className="nav-element">
            <a href="/edit">Edition</a>
        </div>
      </div>
    )
  }
}

export default Navbar;
