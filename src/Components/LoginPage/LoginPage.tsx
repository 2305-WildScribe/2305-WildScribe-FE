import { useEffect, useState } from 'react';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getAdventuresAsync,
  userLoginAsync,
} from '../../Redux/slices/AsyncThunks';
import { selectUser, toggleIsLoggedIn } from '../../Redux/slices/userSlice';

function LoginPage(): React.ReactElement {
  const [userEmail, setUserEmail] = useState<string>('me@gmail.com');
  const [userPassword, setUserPassword] = useState<string>('hi');
  const isLoggedIn = useAppSelector(selectUser).isLoggedIn;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  let user_id = useAppSelector(selectUser).user_id;

  useEffect(() => {
    if (user_id !== '') {
      dispatch(getAdventuresAsync(user_id));
    }
  }, [user_id]);

  async function handleLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    dispatch(toggleIsLoggedIn(true));
    const action = await dispatch(
      userLoginAsync({ email: userEmail, password: userPassword })
    );
    if (userLoginAsync.fulfilled.match(action)) {
      localStorage.setItem('user_id', JSON.stringify(user_id));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    }
    navigate('/home');
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
