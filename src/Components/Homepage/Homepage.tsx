import './Homepage.scss';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Adventure } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface HomepageProps {
  adventures: Adventure[];
  filteredAdventures: (keyword: any) => (Adventure | undefined)[];
}

function Homepage({
  adventures,
  filteredAdventures,
}: HomepageProps): React.ReactElement {
  const [keyword, setKeyword] = useState<string>('');
  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | []
  >([]);
  const [filter, setFilter] = useState<boolean>(false);

  const [zeroResults, setZeroResults] = useState<boolean | null>(null);

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  const handleSearch = () => {
    console.log('search btn hit');
    let editedKeyword = keyword.toLowerCase().trim();
    let results = filteredAdventures(editedKeyword) || [];
    setSearchedAdventures(() =>
      results.filter((result): result is Adventure => result !== undefined)
    );
    console.log('searched Adventures: ', searchedAdventures);
    setFilter(true);
  };

  const clearSearch = () => {
    setKeyword('');
    filteredAdventures('');
    setFilter(false);
    setZeroResults(false);
  };

  return (
    <div id='home-main'>
      {adventures.length ? (
        <>
          <div className='search-bar'>
            {keyword !== '' && (
              <button>
                {keyword}{' '}
                <FontAwesomeIcon
                  icon={faXmark}
                  className='fa-icon'
                  onClick={clearSearch}
                />
              </button>
            )}
            <input
              className='search-input'
              type='text'
              placeholder='Search logs here'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className='search-btn' onClick={() => handleSearch()}>
              Search
            </button>
          </div>
          {searchedAdventures.length === 0 && filter === true && (
            <p>
              Sorry, we couldn't find anything that matched. Please try again.
            </p>
          )}
          {filter ? (
            <AdventureContainer adventures={searchedAdventures} />
          ) : (
            <AdventureContainer adventures={adventures} />
          )}
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
