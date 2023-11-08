import './Homepage.scss';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Adventure } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAdventures } from '../../Context/AdventureContext';
import Loading from '../Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';


function Homepage(): React.ReactElement {
  const {
    // adventures,
    // retrieveUserInformation,
    // filteredAdventures,
    // userId,
    // loading,
    keyword,
    setKeyword,
    setFilter,
    handleSearch,
    filter,
    searchedAdventures,
    setSearchedAdventures,
  } = useAdventures();

  const dispatch = useAppDispatch();

  let adventures = useAppSelector(selectAdventures).adventures;
  let loading = useAppSelector(selectAdventures).loading



  useEffect(() => {
    setKeyword(keyword)
  }, [keyword]);

  const clearSearch = () => {
    setKeyword('');
    setSearchedAdventures(adventures)
    setFilter(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id='home-main'>
          {adventures && adventures.length ? (
            <>
              <div className='search-bar'>
                {keyword !== '' && keyword !== ' ' && (
                  <button className='keyword-btn'>
                    {keyword}{' '}
                    <FontAwesomeIcon
                      icon={faXmark}
                      className='fa-icon delete-keyword'
                      onClick={() =>clearSearch()}
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
                    handleSearch(e.target.value);
                  }}
                />
                <button className='search-btn' onClick={() => handleSearch()}>
                  Search
                </button>
              </div>
              {searchedAdventures.length === 0 && filter === true && (
                <p className='no-results-msg'>
                  Sorry, we couldn't find anything that matched. Please try
                  again.
                </p>
              )}
              <AdventureContainer />
            </>
          ) : (
            <p className='welcome-message'>
              Welcome to WildScribe, an app that tracks your adventures,
              training, beta, etc. so you don't have to. To get started, log
              your first adventure!
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Homepage;
