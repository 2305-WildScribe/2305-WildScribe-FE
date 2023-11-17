import './Homepage.scss';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import { selectUser } from '../../Redux/slices/userSlice';
import AdventureJournalContainer from '../AdventureJournalContainer/AdventureJournalContainer';

function Homepage(): React.ReactElement {
  const [newActivity, setNewActivity] = useState<string>('');
  const [activityTypes, setActivityTypes] = useState<string[]>([]);

  let adventures = useAppSelector(selectAdventures).adventures;
  let loading = useAppSelector(selectAdventures).loading;
  let username = useAppSelector(selectUser).userName;

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

  const handleAddNewActivity = () => {
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
            <div className='new-activity-input-wrapper'>
              <input
                type='text'
                name='newActivity'
                value={newActivity}
                onChange={(event) => setNewActivity(event.target.value)}
                placeholder='Add a new activity'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent the default form submission behavior
                    handleAddNewActivity();
                  }
                }}              />
              {/* <button onClick={(e) => handleAddNewActivity(e)}> + </button> */}
            </div>
          </div>
          <AdventureJournalContainer activityTypes={activityTypes} />
          {activityTypes.length === 0 && (
            <p className='welcome-message'>
              Welcome to WildScribe, an app that tracks your adventures,
              training, beta, etc. so you don't have to. To get started, create
              an activity jounral!
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Homepage;
