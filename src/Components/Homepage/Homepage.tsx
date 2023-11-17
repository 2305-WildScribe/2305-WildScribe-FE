import './Homepage.scss';
import AdventureContainer from '../AdventureContainer/AdventureContainer';
import { Adventure } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import { selectUser } from '../../Redux/slices/userSlice';
import AdventureJournalContainer from '../AdventureJournalContainer/AdventureJournalContainer';

function Homepage(): React.ReactElement {
  const [searchedAdventures, setSearchedAdventures] = useState<
    Adventure[] | []
  >([]);
  const [newActivity, setNewActivity] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [activityTypes, setActivityTypes] = useState<string[]>([]);

  let adventures = useAppSelector(selectAdventures).adventures;
  let loading = useAppSelector(selectAdventures).loading;
  let username = useAppSelector(selectUser).userName;

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

  const filterAdventureTypes = () => {
    let types: string[] = [];
    adventures.forEach((adventure) => {
      if (!types.includes(adventure.activity)) {
        types.push(adventure.activity);
      }
    });
    setActivityTypes([...types]);
  };

  useEffect(() => {
    filterAdventureTypes();
  }, [adventures]);

  const handleAddNewActivity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActivityTypes([...activityTypes, newActivity]);
    setNewActivity('');
    console.log(activityTypes);
  };

  const usernameText = !adventures.length
    ? `Welcome ${username}!`
    : `Welcome back ${username}!`;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id='home-main'>
          <div className='username-wrapper'>
            <p className='username'>{usernameText}</p>
            <div>
              <input
                type='text'
                name='newActivity'
                value={newActivity}
                onChange={(event) => setNewActivity(event.target.value)}
                placeholder='Add a new activity'
              />
              <button onClick={(e) => handleAddNewActivity(e)}> + </button>
            </div>
          </div>
          <AdventureJournalContainer activityTypes={activityTypes} />
          {activityTypes.length === 0 && (
            <p className='welcome-message'>
              Welcome to WildScribe, an app that tracks your adventures,
              training, beta, etc. so you don't have to. To get started, log
              your first adventure!
            </p>
          )}
        </div>
      )}
    </>

    // <>
    //   {loading ? (
    //     <Loading />
    //   ) : (
    //     <div id='home-main'>
    //       {adventures && adventures.length ? (
    //         <>
    //           <div className='search-bar'>
    //             <p className='username'> Welcome back {username}!</p>
    //             {keyword !== '' && keyword !== ' ' && (
    //               <button className='keyword-btn'>
    //                 {keyword}{' '}
    //                 <FontAwesomeIcon
    //                   icon={faXmark}
    //                   className='fa-icon delete-keyword'
    //                   onClick={() => clearSearch()}
    //                 />
    //               </button>
    //             )}
    //             <input
    //               className='search-input'
    //               type='text'
    //               placeholder='Search logs here'
    //               value={keyword}
    //               onChange={(e) => {
    //                 setKeyword(e.target.value);
    //                 handleSearch(e.target.value);
    //               }}
    //             />
    //           </div>
    //           {searchedAdventures.length === 0  && (
    //             <p className='no-results-msg'>
    //               Sorry, we couldn't find anything that matched. Please try
    //               again.
    //             </p>
    //           )}
    //           <AdventureContainer searchedAdventures={searchedAdventures} />
    //         </>
    //       ) : (
    //         <p className='welcome-message'>
    //           Welcome to WildScribe, an app that tracks your adventures,
    //           training, beta, etc. so you don't have to. To get started, log
    //           your first adventure!
    //         </p>
    //       )}
    //     </div>
    //   )}
    // </>
  );
}

export default Homepage;
