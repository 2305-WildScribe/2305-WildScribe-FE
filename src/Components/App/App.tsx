import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postAdventure from '../../apiCalls';

interface Adventure {
  activity: string;
  date: string;
  notes: string;
  image_url: string;
  stress_level: string;
  hydration: number;
  diet: string;
  avdenture_id: number;
}

interface AppState {
  userName: string;
  adventures: Adventure[];
}

function App() {
  const [adventures, setAdventures] = useState<AppState['adventures']>([]);

  useEffect(() => {
    postAdventure().then((data) => {
      console.log(data.data[0].attributes);
      setAdventures(data.data as Adventure[]);
    });
  }, []);

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
