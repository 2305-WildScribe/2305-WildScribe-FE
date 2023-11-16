import './Homepage.scss';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Adventure } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';

function Homepage(): React.ReactElement {

  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | []
  >([]);
  const [keyword, setKeyword] = useState<string>('');
  let adventures = useAppSelector(selectAdventures).adventures;
  let loading = useAppSelector(selectAdventures).loading;

  useEffect(() => {
    setSearchedAdventures(adventures);
  }, [adventures]);

  const clearSearch = () => {
    setKeyword('');
    setSearchedAdventures(adventures);
  };

  const filteredAdventures = (keyword: string) => {
    return (
      adventures &&
      adventures.filter((adventure) => {
        return (
          adventure.activity.toLowerCase().includes(keyword) ||
          adventure.date?.includes(keyword) ||
          adventure.sleep_stress_notes?.toLowerCase().includes(keyword) ||
          adventure.diet_hydration_notes?.toLowerCase().includes(keyword) ||
          adventure.beta_notes?.toLowerCase().includes(keyword)
        );
      })
    );
  };

  const handleSearch = (keyword: string) => {
    let results = filteredAdventures(keyword) || [];
    setSearchedAdventures([...results] as Adventure[]);
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
                      onClick={() => clearSearch()}
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
              </div>
              {searchedAdventures.length === 0  && (
                <p className='no-results-msg'>
                  Sorry, we couldn't find anything that matched. Please try
                  again.
                </p>
              )}
              <AdventureContainer searchedAdventures={searchedAdventures} />
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
