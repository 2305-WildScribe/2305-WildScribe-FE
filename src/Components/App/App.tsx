import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postAdventure from '../../apiCalls';
import { AdventureProp } from '../AdventureCard/AdventureCard';

interface AppState {
  userName: string;
  adventures: AdventureProp[];
}

function App() {
  const [adventures, setAdventures] = useState<AppState['adventures']>([]);

  useEffect(() => {
    postAdventure().then((data) => {
      setAdventures(data.data[0].attributes as AdventureProp[]);
    });
  }, []);

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage adventures={adventures}/>} />
      </Routes>
    </div>
  );
}

export default App;
