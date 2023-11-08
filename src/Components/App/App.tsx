import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { AdventureContextProvider } from '../../Context/AdventureContext';
import { Route, Routes } from 'react-router-dom';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';
import LoginPage from '../LoginPage/LoginPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import EditLogForm from '../EditLogForm/EditLogForm';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import {
  addAdventure,
  selectAdventures,
} from '../../Redux/slices/adventuresSlice';

import { useEffect } from 'react';
import { selectUserId, userLoginAsync } from '../../Redux/slices/userSlice';

function App(): React.ReactElement {
  console.log('here', useAppSelector(selectAdventures));
  console.log('also here', useAppSelector(selectUserId).userID);

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(userLoginAsync({ email: 'me@gmail.com', password: 'hi' }))

  }, []);

  return (
    <AdventureContextProvider>
      <div className='App'>
        <NavBar />
        <main className='main'>
          <div className='inner-main'>
            <Routes>
              <Route path='/' element={<LoginPage />} />
              <Route path='/home' element={<Homepage />} />
              <Route path='/logAdventure' element={<LogAdventureForm />} />
              <Route path={'/edit'} element={<EditLogForm />} />
              <Route path='/error' element={<ErrorPage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </AdventureContextProvider>
  );
}

export default App;
