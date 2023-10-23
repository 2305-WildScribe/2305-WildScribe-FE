import { useState } from 'react';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import { userLogin,  } from '../../apiCalls';

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  isLoggedIn: boolean | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setUserId: React.Dispatch<React.SetStateAction<string | null>>
  retrieveUserInformation: (id: string) => Promise<void>

}

function LoginPage({
  setIsLoggedIn,
  isLoggedIn,
  loading,
  setLoading,
  setUserId,
  retrieveUserInformation,
}: LoginPageProps): React.ReactElement {
  const [userEmail, setUserEmail] = useState<string>('me@gmail.com');
  const [userPassword, setUserPassword] = useState<string>('hi');
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent): null {
    event.preventDefault();
    setIsLoggedIn(true);
    setLoading(true);
    userLogin('me@gmail.com', 'hi').then((response) => {
      const userId = response.data.attributes.user_id;
      setUserId(userId);
      localStorage.setItem('UserId', JSON.stringify(userId));
      console.log('is',userId)
      retrieveUserInformation(userId)
      localStorage.setItem('UserId', JSON.stringify(true));
      console.log('isLoggedIn', isLoggedIn);
      navigate('/home');
    });
    return null;
  }

  return (
    <form className='login-form'>
      {!loading && (
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

          <button className='login-btn' type='submit' onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </div>
      )}
    </form>
  );
}
export default LoginPage;
