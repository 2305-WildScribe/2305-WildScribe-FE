import { useEffect, useState } from 'react';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../apiCalls';
import { useAdventures } from '../../Context/AdventureContext';
import Loading from '../Loading/Loading';

function LoginPage(): React.ReactElement {
  const {
    adventures,
    retrieveUserInformation,
    logNewAdventure,
    deleteAdventureOnDom,
    setAdventures,
    filteredAdventures,
    setIsLoggedIn,
    setLoading,
    setUserId,
    isLoggedIn,
    loading,
  } = useAdventures();

  const [userEmail, setUserEmail] = useState<string>('me@gmail.com');
  const [userPassword, setUserPassword] = useState<string>('hi');
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent): null {
    event.preventDefault();
    setIsLoggedIn(true);
    setLoading(true);
    userLogin(userEmail, userPassword).then((response) => {
      const userId = response.data.attributes.user_id;
      setUserId(userId);
      localStorage.setItem('UserId', JSON.stringify(userId));
      console.log('user id: ', userId);
      retrieveUserInformation(userId);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      console.log('isLoggedIn', isLoggedIn);
      navigate('/home');
    });
    return null;
  }

  return (
    <form className='login-form'>
      <div className='form-wrapper'>
        <p>Welcome to WildScribe! Please log in to continue.</p>
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

        <button
          className='login-btn'
          type='submit'
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginPage;
