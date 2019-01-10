import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../constants';
import { styles } from '../../constants';

class Navbar extends Component {
  
  render() {

    const activeCss = {
      color: styles.primary,
      borderBottom: '3px solid ' + styles.primary,
    };

    return (
        <div className="navbar-container">
          <div className="nav-element">
              <NavLink to='/dashboard' activeStyle={activeCss}>Dashboard</NavLink>
          </div>
          <div className="nav-element">
              <NavLink to='/edit' activeStyle={activeCss}>Edition</NavLink>
          </div>
        </div>
    )
  }
}

export default Navbar;
