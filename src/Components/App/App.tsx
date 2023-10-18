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
import Loading from '../Loading/Loading';

function App(): React.ReactElement {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [error, setError] = useState<Error>({ error: false, message: '' });
  const [loading, setLoading] = useState(false)

  const logNewAdventure = (newAdventureData: Adventure) => {
    setAdventures([...adventures, newAdventureData]);
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const parsedBoolean = savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : null;
    return parsedBoolean || null;
  });

  const [userId, setUserId] = useState<string | null>(() => {
    const savedUserId = localStorage.getItem('UserId');
    const parsedId = savedUserId ? JSON.parse(savedUserId) : null;
    return parsedId || null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  console.log('is logged in?',isLoggedIn)

  const retrieveUserInformation = async (id: string) => {
    try {
      const data = await fetchUserLogs(id);
      console.log('user id', id);

      setAdventures(data.data.attributes as Adventure[]);
      setError({ error: false, message: '' });
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
    userLogin('me@gmail.com', "hi").then((response) => {
      console.log('response',response)
      const userId = response.data.attributes.user_id;
      setUserId(userId);
      localStorage.setItem('UserId', JSON.stringify(userId));
      console.log('userId', userId);
      retrieveUserInformation(userId);
    });
  }, [userId]);
    setLoading(true)
    fetchUserLogs()
      .then((data) => {
        setAdventures(data.data.attributes as Adventure[]);
        setLoading(false)
        setError({ error: false, message: '' });
      })
      .catch((error) => {
        setError({ error: true, message: error });
        setLoading(false)
        navigate('/error');
      });
  }, []);

  return (
    <div className='App'>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <main className='main'>
        <div className='inner-main'>
          {loading && <Loading />}
          <Routes>
            <Route
              path='/'
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/home'
              element={!loading && <Homepage adventures={adventures} />}
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
