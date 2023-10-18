import { useEffect, useState } from 'react';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  isLoggedIn: boolean | null;
  loading: boolean;
}

function LoginPage({
  setIsLoggedIn,
  isLoggedIn,
  loading,
}: LoginPageProps): React.ReactElement {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem('UserId', JSON.stringify(true));
    console.log('isLoggedIn', isLoggedIn);
    navigate('/home');
  };

  return (
    <form className='login-form'>
      {!loading && (
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
      )}
    </form>
  );
}
export default LoginPage;
