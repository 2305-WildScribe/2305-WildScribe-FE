import './Homepage.scss';
import { useEffect } from 'react';
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
          </div>
          <div className='content-wrapper'>
            {activityTypes?.length === 0 ? (
              <p className='welcome-message'>
                Welcome to WildScribe, an app that tracks your activities,
                training, beta, etc. so you don't have to. To get started,
                create an activity journal!
              </p>
            ) : (
              <AdventureJournalContainer />
            )}
            <UserInfoContainer />
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
