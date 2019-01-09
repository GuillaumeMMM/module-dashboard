import React, { Component } from 'react';
import icon from '../../assets/icon.png';
import Navbar from '../elements/Navbar';

class Sidebar extends Component {
  render() {
    return (
        <div className="sidebar">
            <div className="sidebar-icon-container">
                <img className="sidebar-icon" src={icon} alt="sidebar icon"></img>
            </div>
            <div className="profile-name">
                Guillaume Meigniez
            </div>
            <Navbar></Navbar>
        </div>
    )
  }
}

export default Sidebar;
