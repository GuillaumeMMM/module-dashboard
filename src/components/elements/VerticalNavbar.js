import React, { Component } from 'react';

class VerticalNavbar extends Component {
  render() {
    return (
      <div className="vertical-navbar-container">
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

export default VerticalNavbar;
