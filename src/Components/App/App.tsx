import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserLogs } from '../../apiCalls';
import { Adventure, Error } from '../../types';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../Loading/Loading';

function App(): React.ReactElement {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [error, setError] = useState<Error>({ error: false, message: '' });
  const [loading, setLoading] = useState(false)

  const logNewAdventure = (newAdventureData: Adventure) => {
    setAdventures([...adventures, newAdventureData]);
  };

  const navigate = useNavigate();

  useEffect(() => {
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
      <NavBar />
      <main className='main'>
        <div className='inner-main'>
          {loading && <Loading />}
          <Routes>
            <Route path='/' element={!loading && <Homepage adventures={adventures} />} />
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
