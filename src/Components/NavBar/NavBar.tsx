import './NavBar.scss';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';

interface NavBarProps {
  isLoggedIn: boolean|null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
}
function NavBar({ isLoggedIn,setIsLoggedIn }: NavBarProps): React.ReactElement {
  const navigate = useNavigate()
  const handleLogOut = () => {
    setIsLoggedIn(false)
    localStorage.setItem('UserId', JSON.stringify(false));
    navigate('/')
  }
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
          <button onClick={()=>handleLogOut()} className='nav-link log-out-btn'>
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
