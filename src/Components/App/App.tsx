import './App.scss';
import Homepage from '../Homepage/Homepage';
import NavBar from '../NavBar/NavBar';
import Adventure from '../Adventure/Adventure';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes> 
        <Route path='/' element={<Homepage /> } /> 
        <Adventure />
        <AdventureContainer />
      </Routes>
    </div>
  );
}

export default App;
