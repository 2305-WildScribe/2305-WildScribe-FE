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
  const [message, setMessage] = useState<string>('');

  let adventures = useAppSelector(selectAdventures).adventures;
  let loading = useAppSelector(selectAdventures).loading;
  let username = useAppSelector(selectUser).userName;

  const filterAdventureTypes = () => {
    let types: string[] = [];
    adventures && adventures.forEach((adventure) => {
      if (!types.includes(adventure.activity)) {
        types.push(adventure.activity);
      }
    });
    setActivityTypes([...types]);
  };

  useEffect(() => {
    filterAdventureTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adventures]);

  const handleAddNewActivity = () => {
    setMessage('');
    if (newActivity === '') {
      setMessage(`Please enter a new activity you would like to track!`);
    } else if (!activityTypes.includes(newActivity)) {
      setActivityTypes([...activityTypes, newActivity]);
      setNewActivity('');
    } else {
      setMessage(`It looks like you already have a ${newActivity} journal`);
      setNewActivity('');
    }
  };

  const usernameText = !adventures?.length
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
            <div className='input-message-wrapper'>
              {message !== '' && <p>{message}</p>}
              <div className='input-wrapper'>
                <input
                  type='text'
                  name='newActivity'
                  value={newActivity}
                  onChange={(event) => setNewActivity(event.target.value)}
                  placeholder='Add a new activity'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNewActivity();
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <AdventureJournalContainer activityTypes={activityTypes} />
          {activityTypes?.length === 0 && (
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
