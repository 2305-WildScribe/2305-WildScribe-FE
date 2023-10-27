import './Homepage.scss';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Adventure } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAdventures } from '../../Context/AdventureContext'
import Loading from '../Loading/Loading';

function Homepage(): React.ReactElement {
  const {
    adventures,
    retrieveUserInformation,
    filteredAdventures,
    userId,
    loading,
    // keyword,
    // setKeyword,
    // setSearchedAdventures,
  } = useAdventures();

  const [keyword, setKeyword] = useState<string>('');
  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | []
  >([]);

  const [filter, setFilter] = useState<boolean>(false);

  useEffect(() => {
    console.log('userid', userId);
    // retrieveUserInformation(userId);
    console.log('adventurs', adventures);
    console.log('keyword', keyword);
    // handleSearch();
  }, []);

  const handleSearch = () => {
    let editedKeyword = keyword.toLowerCase().trim();
    let results = filteredAdventures(editedKeyword) || [];
    setSearchedAdventures(() =>
      results.filter(
        (result: Adventure): result is Adventure => result !== undefined
      )
    );
    setFilter(true);
  };

  const clearSearch = () => {
    setKeyword('');
    filteredAdventures([]);
    setFilter(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div id='home-main'>
        {adventures && adventures.length ? (
          <>
            <div className='search-bar'>
              {keyword !== '' && (
                <button className='keyword-btn'>
                  {keyword}{' '}
                  <FontAwesomeIcon
                    icon={faXmark}
                    className='fa-icon delete-keyword'
                    onClick={clearSearch}
                  />
                </button>
              )}
              <input
                className='search-input'
                type='text'
                placeholder='Search logs here'
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  handleSearch();
                }}
              />
              <button className='search-btn' onClick={() => handleSearch()}>
                Search
              </button>
            </div>
            {searchedAdventures.length === 0 && filter === true && (
              <p className='no-results-msg'>
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
            Welcome to WildScribe, an app that tracks your adventures, training,
            beta, etc. so you don't have to. To get started, log your first
            adventure!
          </p>
        )}
      </div>
    </>
  );
}

export default Homepage;
