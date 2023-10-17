import { useEffect, useState } from 'react';
import { Adventure, Error } from '../../types';
import './LoginPage.scss';
import { userLogin, fetchUserLogs } from '../../apiCalls';
import { Navigate, useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  // setAdventures: React.Dispatch<React.SetStateAction<Adventure[]>>;
  // error: Error;
  // setError: React.Dispatch<React.SetStateAction<Error>>;
  // setUserId: React.Dispatch<React.SetStateAction<number | null>>
  // userId: number|null;
}

function LoginPage({
  setIsLoggedIn,
  // setAdventures,
  // setError,
  // setUserId,
  // userId
}: LoginPageProps): React.ReactElement {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const navigate = useNavigate();



  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
      setIsLoggedIn(true);
      navigate('/home');
  };

  return (
    <form className='login-form'>
      <div className='form-wrapper'>
        <p>Welcome to WildScribe! Please login to continue.</p>
        <input
          type='email'
          id='email'
          name='email'
          value={userEmail}
          placeholder='Email'
          onChange={(event) => setUserEmail(event.target.value)}
          required
        />

        <input
          type='password'
          id='password'
          name='password'
          value={userPassword}
          placeholder='Password'
          onChange={(event) => setUserPassword(event.target.value)}
          required
        />

        <button type='submit' onClick={(e) => handleLogin(e)}>
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginPage;
