import { useState } from 'react';
import './LoginPage.scss';

interface LoginPageProps {
  setUserAuthentication: React.Dispatch<React.SetStateAction<object>> ;
  userAuthentication: object;
}

function LoginPage({setUserAuthentication, userAuthentication}: LoginPageProps): React.ReactElement {



  return (
    <form>
      {/* <label for='email'>Email:</label> */}
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Your email'
        required
      />

      {/* <label for='password'>Password:</label> */}
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Your password'
        required
      />

      <button type='submit'>Login</button>
    </form>
  );
}
export default LoginPage;
