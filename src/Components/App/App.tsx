import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postAdventure from '../../apiCalls';
import { AdventureProp } from '../AdventureCard/AdventureCard';
import LogAdventureForm from '../LogAdventureForm/LogAdventureForm';

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
      <LogAdventureForm />
      <Routes>
        <Route path='/' element={<Homepage adventures={adventures}/>} />
      </Routes>
    </div>
  );
}

export default App;
