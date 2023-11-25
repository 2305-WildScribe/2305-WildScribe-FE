import './Homepage.scss';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  selectAdventures,
  setActivityTypes,
  // addNewActivityType,
} from '../../Redux/slices/adventuresSlice';
import { selectUser } from '../../Redux/slices/userSlice';
import AdventureJournalContainer from '../AdventureJournalContainer/AdventureJournalContainer';
import UserInfoContainer from '../UserInfoContainer/UserInfoContainer';

function Homepage(): React.ReactElement {
  // const [newActivity, setNewActivity] = useState<string>('');
  // const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();
  let activityTypes = useAppSelector(selectAdventures).activityTypes;
  let adventures = useAppSelector(selectAdventures).adventures;
  let loading = useAppSelector(selectAdventures).loading;
  let username = useAppSelector(selectUser).userName;

  useEffect(() => {
    dispatch(setActivityTypes(adventures));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adventures]);

  // const handleAddNewActivity = () => {
  //   setMessage('');
  //   if (newActivity === '') {
  //     setMessage(`Please enter a new activity you would like to track!`);
  //   } else if (!activityTypes.includes(newActivity)) {
  //     const capitalizedNewActivity = () =>
  //       newActivity.charAt(0).toUpperCase() + newActivity.slice(1).trim();

  //     dispatch(addNewActivityType(capitalizedNewActivity()));
  //     setNewActivity('');
  //   } else {
  //     setMessage(`It looks like you already have a ${newActivity} journal`);
  //     setNewActivity('');
  //   }
  // };

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
            {/* <div className='input-message-wrapper'>
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
            </div> */}
          </div>
          <div className='content-wrapper'>
            <AdventureJournalContainer />
            <UserInfoContainer />
          </div>
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
