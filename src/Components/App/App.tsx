import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import Adventure from '../Adventure/Adventure';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

interface Adventures {
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
  adventures: Adventures[];
}

function App() {
  const [adventures, setAdventures] = useState<AppState['adventures']>()
  
  return (
    <div className='App'>
      <NavBar />
      <Routes> 
        <Route path='/' element={<Homepage /> } />
      </Routes>
    </div>
  );
}

export default App;
