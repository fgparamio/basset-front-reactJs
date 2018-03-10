import React, { Component } from 'react';
import logo from '../logo.svg';

/**
*   @autor: fgparamio
*
*   HEADER COMPONENT => Show Main Header Component
*
*/
class Header extends Component {

  /**
  *  Render Default Header
  */
  render() {
    return (
     <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Basset Users</h1>
    </header>)
  }
} // End Component
export default Header;
