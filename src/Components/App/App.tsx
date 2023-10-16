import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserLogs } from '../../apiCalls';
import Adventure from '../../../types';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';
import ErrorPage from '../ErrorPage/ErrorPage';

function App(): React.ReactElement {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  const logNewAdventure = (newAdventureData: Adventure) => {
    setAdventures([...adventures, newAdventureData]);
  };

  useEffect(() => {
    fetchUserLogs().then((data) => {
      setAdventures(data.data[0].attributes as Adventure[]);
    });
  }, []);

  return (
    <div className='App'>
      <NavBar />
      <main className='main'>
        <div className='inner-main'>
          <Routes>
            <Route path='/' element={<Homepage adventures={adventures} />} />
            <Route
              path='/logAdventure'
              element={
                <LogAdventureForm
                  logNewAdventure={logNewAdventure}
                  adventures={adventures}
                  setAdventures={setAdventures}
                />
              }
            />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
