import './Homepage.scss';
import { Adventure } from '../../types';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
// import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface HomepageProps {
  adventures: Adventure[];
  setSearchedAdventures: (e: any) => void;
}

function Homepage({
  adventures,
  setSearchedAdventures,
}: HomepageProps): React.ReactElement {
  
  const [keyword, setKeyword] = useState<string>('');

  const handleSearch = () => {
    console.log('search btn hit');
    setSearchedAdventures(keyword);
    clearSearch();
  };

  const clearSearch = () => {
    setKeyword('');
    setSearchedAdventures('');
  };

  return (
    <div id='home-main'>
      {adventures.length ? (
        <>
          {keyword !=='' && <button>{keyword}</button>}
          <input
            type='text'
            placeholder='Search...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className='search-btn' onClick={() => handleSearch()}>
            Search Logs
          </button>
          <AdventureContainer adventures={adventures} />
        </>
      ) : (
        <p className='welcome-message'>
          Welcome to WildScribe, an app that lets track your adventures,
          training, beta, etc. in order to improve in the activities you enjoy.
          To get started, log your first adventure!
        </p>
      )}
    </div>
  );
}

export default Homepage;
