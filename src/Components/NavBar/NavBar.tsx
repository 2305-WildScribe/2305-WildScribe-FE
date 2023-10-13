import './NavBar.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/logo.png';

function NavBar(): React.ReactElement {
  return (
    <nav className='nav-bar'>
      <div className='nav-text-wrapper'>
        <img className='logo' src={logo} />
        <h1>WildScribe</h1>
      </div>
      <div className='nav-button-container'>
        <NavLink className='home-btn nav-link' to='/'>
          Home
        </NavLink>
        {/* <NavLink className='nav-link' to='/'> 
        Log New Adventure
      </NavLink> */}
      </div>
    </nav>
  );
}

export default NavBar;
