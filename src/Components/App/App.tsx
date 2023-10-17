import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserLogs, userLogin } from '../../apiCalls';
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


  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);


  const [userId, setUserId] = useState<string | null>(() => {
    const savedUserId = localStorage.getItem('UserId');
    const parsedId = savedUserId ? JSON.parse(savedUserId) : null;
    return parsedId || null;
  });
  const navigate = useNavigate();

  const retrieveUserInformation = async (id: number) => {
    try {
      const data = await fetchUserLogs(id);
      console.log('user id', id);

      setAdventures(data.data.attributes as Adventure[]);
      setError({ error: false, message: '' });
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
      setError({
        error: true,
        message: 'Oops, something went wrong, please try again later',
      });
      navigate('/error');
    }
  };

  useEffect(() => {
    userLogin('bill.bob@bob.com', "don'tlookatthis").then((response) => {
      const userId = response.data.attributes.user_id;
      console.log('user id before api call', userId);

      setUserId(userId);
      localStorage.setItem('UserId', JSON.stringify(userId));
      console.log('userId', userId);
      retrieveUserInformation(userId);
    });
  }, [userId]);

  return (
    <div className='App'>
      <NavBar isLoggedIn={isLoggedIn} />
      <main className='main'>
        <div className='inner-main'>
          <Routes>
            <Route
              path='/'
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path='/home'
              element={<Homepage adventures={adventures} />}
            />
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
