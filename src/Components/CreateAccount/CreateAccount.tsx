import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { userCreateAsync } from "../../Redux/slices/AsyncThunks";


function CreateAccount(): React.ReactElement {
    const [newUserEmail, setNewUserEmail] = useState<string>('')
    const [newUserPassword, setNewUserPassword] = useState<string>('')
    const [newUserName, setNewUserName] = useState<string>('')
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    async function handleCreateUser(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        console.log(newUserEmail)
        console.log(newUserPassword)
        const action = await dispatch(
          userCreateAsync({name: newUserName, email: newUserEmail, password: newUserPassword })
        );
        navigate('/home');
    }

    return( 
    <form className='create-user-form' onSubmit={(e) => handleCreateUser(e)}>
    <div className='form-wrapper'>
      <p>Welcome to WildScribe! Create an account to get started.</p>
      <input
        type='text'
        id='username'
        name='username'
        placeholder="Enter a username"
        value={newUserName}
        onChange={(event) => setNewUserName(event.target.value)}
        required
      />
      <input
        type='email'
        id='email'
        name='email'
        value={newUserEmail}
        placeholder='Email'
        onChange={(event) => setNewUserEmail(event.target.value)}
        required
      />

      <input
        type='password'
        id='password'
        name='password'
        value={newUserPassword}
        placeholder='Password'
        onChange={(event) => setNewUserPassword(event.target.value)}
        required
      />

      <button className='create-account-btn' type='submit'>
        Create Account
      </button>
    </div>
  </form>)
}

export default CreateAccount