import { useEffect, useState } from 'react';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import { useAdventures } from '../../Context/AdventureContext';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { getAdventuresAsync } from '../../Redux/slices/adventuresSlice';
import { selectUser, userLoginAsync } from '../../Redux/slices/userSlice';

function LoginPage(): React.ReactElement {
 
  const {
    setIsLoggedIn,
  } = useAdventures();

  const [userEmail, setUserEmail] = useState<string>('me@gmail.com');
  const [userPassword, setUserPassword] = useState<string>('hi');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  let userId = useAppSelector(selectUser).userID;

  useEffect(() => {
    if (userId !== '') {
     dispatch(getAdventuresAsync(userId));
      navigate('/home');
    }
  }, [userId]);

  async function handleLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setIsLoggedIn(true);

    const action = await dispatch(
      userLoginAsync({ email: userEmail, password: userPassword })
    );
    if (userLoginAsync.fulfilled.match(action)) {
      localStorage.setItem('UserId', JSON.stringify(userId));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    }

  }

  return (
    <form className='login-form' onSubmit={(e) => handleLogin(e)}>
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

        <button className='login-btn' type='submit'>
          Login
        </button>
      </div>
    </form>
  );
}
export default LoginPage;
