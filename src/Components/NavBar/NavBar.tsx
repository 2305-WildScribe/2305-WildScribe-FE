import './NavBar.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(): React.ReactElement {
  return (
    <nav className='nav-bar'>
      <div className='nav-button-container'>
        <NavLink className='nav-link' to='/'>
          Home
        </NavLink>
        <NavLink className='nav-link' to='/logAdventure'> 
        Log New Adventure
      </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
