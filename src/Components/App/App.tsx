import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { fetchUserLogs } from '../../apiCalls';
import { Adventure, Error } from '../../types';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';
import ErrorPage from '../ErrorPage/ErrorPage';
import LoginPage from '../LoginPage/LoginPage';

function App(): React.ReactElement {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  const [error, setError] = useState<Error>({ error: false, message: '' });

  const logNewAdventure = (newAdventureData: Adventure) => {
    setAdventures([...adventures, newAdventureData]);
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
 
  return (
    <div className='App'>
      <NavBar isLoggedIn={isLoggedIn}/>
      <main className='main'>
        <div className='inner-main'>
          <Routes>
            <Route
              path='/'
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setAdventures={setAdventures}
                  setError={setError}
                  error={error}
                />
              }
            />
            <Route path='/home' element={<Homepage adventures={adventures} />} />
            <Route
              path='/logAdventure'
              element={
                <LogAdventureForm
                  logNewAdventure={logNewAdventure}
                  adventures={adventures}
                  setAdventures={setAdventures}
                  error={error}
                  setError={setError}
                />
              }
            />
            <Route
              path='/error'
              element={<ErrorPage message={error.message} />}
            />
            <Route path='*' element={<ErrorPage message={error.message} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
