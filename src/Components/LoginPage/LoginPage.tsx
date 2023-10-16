import { useState } from 'react';
import { Adventure, Error } from '../../types';
import './LoginPage.scss';
import { userLogin, fetchUserLogs } from '../../apiCalls';
import { Navigate, useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setAdventures: React.Dispatch<React.SetStateAction<Adventure[]>>;
  error: Error;
  setError: React.Dispatch<React.SetStateAction<Error>>;
}

function LoginPage({
  setIsLoggedIn,
  setAdventures,
  setError,
}: LoginPageProps): React.ReactElement {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userLogin('bill.bob@bob.com', "don'tlookatthis");
      const userId = response.data.attributes.user_id;

      const data = await fetchUserLogs(userId);
      console.log(data);
      setAdventures(data.data.attributes as Adventure[]);
      setError({ error: false, message: '' });
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      setIsLoggedIn(false);
      console.error(error);
      setError({
        error: true,
        message: 'Oops, something went wrong, please try again later',
      });
      navigate('/error');
    }
  };

  return (
    <form className='login-form'>
      <div className='form-wrapper'>
        <p>Welcome to WildScribe! Please login to continue.</p>
        {/* <label for='email'>Email:</label> */}
        <input
          type='email'
          id='email'
          name='email'
          value={userEmail}
          placeholder='Your email'
          onChange={(event) => setUserEmail(event.target.value)}
          required
        />

        {/* <label for='password'>Password:</label> */}
        <input
          type='password'
          id='password'
          name='password'
          value={userPassword}
          placeholder='Your password'
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
