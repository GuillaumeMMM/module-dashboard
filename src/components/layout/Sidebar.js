import React, { Component } from 'react';
import icon from '../../assets/icon.png';
import VerticalNavbar from '../elements/VerticalNavbar';

class Sidebar extends Component {
  render() {
    return (
        <div className="sidebar">
            <div className="sidebar-icon-container">
                <img className="sidebar-icon" src={icon} alt="sidebar icon"></img>
            </div>
            <VerticalNavbar></VerticalNavbar>
        </div>
    )
  }
}

export default Sidebar;
