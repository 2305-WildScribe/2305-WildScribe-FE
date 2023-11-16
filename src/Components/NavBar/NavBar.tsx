import './NavBar.scss';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { selectUser, toggleIsLoggedIn } from '../../Redux/slices/userSlice';

function NavBar(): React.ReactElement {
  const isLoggedIn = useAppSelector(selectUser).isLoggedIn
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
    dispatch(toggleIsLoggedIn(false))
  };
  
  return (
    <nav className='nav-bar'>
      <div className='nav-text-wrapper'>
        <img
          className='logo'
          src={logo}
          alt='WildScribe logo of an open book in front of a mountain range'
        />
        <h1>WildScribe</h1>
      </div>
      {isLoggedIn && (
        <div className='nav-button-container'>
          <NavLink className='home-btn nav-link' to='/home'>
            Home
          </NavLink>
          <NavLink className='new-adventure-btn nav-link' to='/logAdventure'>
            Log New Adventure
          </NavLink>
          <button
            onClick={() => handleLogOut()}
            className='nav-link log-out-btn'
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
