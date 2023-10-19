import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserAdventures, userLogin } from '../../apiCalls';
import { Adventure, Error } from '../../types';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';
import LoginPage from '../LoginPage/LoginPage';
import Loading from '../Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';

function App(): React.ReactElement {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [error, setError] = useState<Error>({ error: false, message: '' });
  const [loading, setLoading] = useState(false);

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

  const deleteAdventureOnDom = (adventure_id: string | undefined) => {
    const filterAdventures = adventures.filter(
      (adventure) => adventure.adventure_id !== adventure_id
    );
    setAdventures(filterAdventures);
  };

  const navigate = useNavigate();

  const filteredAdventures = (keyword: any) => {
    console.log('keyword', keyword);

    let searchedLogs = adventures.map((adventure) => {
      if (
        adventure.activity.toLowerCase().includes(keyword) ||
        adventure.date?.includes(keyword) ||
        adventure.sleep_stress_notes?.toLowerCase().includes(keyword) ||
        adventure.diet_hydration_notes?.toLowerCase().includes(keyword) ||
        adventure.beta_notes?.toLowerCase().includes(keyword)
      ) {
        return adventure;
      } else {
        return undefined;
      }
    });

    return searchedLogs;
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const retrieveUserInformation = async (id: string | null) => {
    try {
      const data = await fetchUserAdventures(id);
      setLoading(false);
      console.log(data);
      setAdventures(data.data.attributes as Adventure[]);
      setError({ error: false, message: '' });
    } catch (error) {
      setIsLoggedIn(false);
      setLoading(false);
      setError({
        error: true,
        message: 'Oops, something went wrong, please try again later',
      });
      navigate('/error');
    }
  };

  useEffect(() => {
    setLoading(false);
    userLogin('me@gmail.com', 'hi').then((response) => {
      const userId = response.data.attributes.user_id;
      setUserId(userId);
      localStorage.setItem('UserId', JSON.stringify(userId));
    });
  }, [userId]);

  if (loading) {
    retrieveUserInformation(userId);
  }

  return (
    <div className='App'>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
                  loading={loading}
                  setLoading={setLoading}
                  setUserId={setUserId}
                  retrieveUserInformation={retrieveUserInformation}
                />
              }
            />
            <Route
              path='/home'
              element={
                !loading && (
                  <Homepage
                    filteredAdventures={filteredAdventures}
                    adventures={adventures}
                    deleteAdventureOnDom={deleteAdventureOnDom}
                  />
                )
              }
            />
            <Route
              path='/logAdventure'
              element={
                <LogAdventureForm
                  userId={userId}
                  loading={loading}
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
