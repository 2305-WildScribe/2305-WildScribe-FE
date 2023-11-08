import { useEffect, useState } from 'react';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
// import { userLogin } from '../../apiCalls';
import { useAdventures } from '../../Context/AdventureContext';
// import Loading from '../Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { getAdventuresAsync } from '../../Redux/slices/adventuresSlice';
import { selectUser, userLoginAsync } from '../../Redux/slices/userSlice';

function LoginPage(): React.ReactElement {
  const {
    // adventures,
    // retrieveUserInformation,
    // logNewAdventure,
    // deleteAdventureOnDom,
    // setAdventures,
    // filteredAdventures,
    setIsLoggedIn,
    setLoading,
    // setUserId,
    // isLoggedIn,
    loading,
  } = useAdventures();
  const [userEmail, setUserEmail] = useState<string>('me@gmail.com');
  const [userPassword, setUserPassword] = useState<string>('hi');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(useAppSelector(selectUser));

  let userId = useAppSelector(selectUser).userID;
  // let loading = useAppSelector(selectUserId).loading;

  useEffect(() => {
    if (userId !== '') {
     dispatch(getAdventuresAsync(userId));
      console.log('I went off', userId);
      console.log(loading)
      navigate('/home');

    }
  }, [userId]);

  async function handleLogin(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setIsLoggedIn(true);
    // setLoading(true);

    const action = await dispatch(
      userLoginAsync({ email: userEmail, password: userPassword })
    );
    if (userLoginAsync.fulfilled.match(action)) {
      // const id = action.payload.data.attributes.user_id
      console.log(userId);
      // dispatch(getAdventuresAsync(id))
      localStorage.setItem('UserId', JSON.stringify(userId));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    }

    
    setLoading(false);

    // userLogin(userEmail, userPassword).then((response) => {
    //   const userId = response.data.attributes.user_id;
    //   setUserId(userId);
    //   console.log('user id: ', userId);
    //   retrieveUserInformation(userId);
    //   console.log('isLoggedIn', isLoggedIn);
    // navigate('/home');
    // });
    // return null;
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
