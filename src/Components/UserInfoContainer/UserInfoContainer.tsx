import './UserInfoContainer.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  selectAdventures,
  addNewActivityType,
} from '../../Redux/slices/adventuresSlice';
import dayjs from 'dayjs';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from 'react';
// import {
//   addNewActivityType,
// } from '../../Redux/slices/adventuresSlice';
function UserInfoContainer() {
  let adventures = useAppSelector(selectAdventures).adventures;
  let activityTypes = useAppSelector(selectAdventures).activityTypes;
  const [newActivity, setNewActivity] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  function findMostRecentLog() {
    let sorted = adventures?.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return sorted[0];
  }

  const mostRecent = adventures && findMostRecentLog();
  const mostRecentDate = dayjs(mostRecent?.date)?.format('MM-DD-YYYY');
  const mostRecentActivity = adventures && findMostRecentLog()?.activity;

  const pieChartData = () => {
    const types = activityTypes?.map((type, index) => {
      let data = { id: index, value: 0, label: '' };
      data.label += type;
      adventures?.forEach((adventure) => {
        if (adventure.activity === type) {
          data.value += 1;
        }
      });
      return data;
    });
    return types;
  };

  const handleAddNewActivity = () => {
    setMessage('');
    const lowercasedNewActivity = newActivity?.toLowerCase();

    if (newActivity === '') {
      setMessage(`Please enter a new activity you would like to track!`);
    } else if (
      !activityTypes.some(
        (activity) => activity.toLowerCase() === lowercasedNewActivity
      )
    ) {
      const capitalizedNewActivity =
        newActivity.charAt(0).toUpperCase() + newActivity.slice(1).trim();
      dispatch(addNewActivityType(capitalizedNewActivity));
      setNewActivity('');
    } else {
      setMessage(`It looks like you already have a ${newActivity} journal`);
      setNewActivity('');
    }
  };

  const palette = ['#01204E', '#028391', '#115C80', '#008081', '#479685'];
  return (
    <div className='user-info-wrapper'>
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
        {message !== '' && <p>{message}</p>}
      </div>
      {!adventures || adventures.length === 0 ? (
        <p>Info about your logs will appear here!</p>
      ) : (
        <p>
          Your last log was on <span>{mostRecentDate}</span> in your
          <span> {mostRecentActivity}</span> journal
        </p>
      )}
      {adventures !== null && (
        <div className='pie-chart'>
          <PieChart
            colors={palette}
            series={[
              {
                data: pieChartData(),
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      )}
    </div>
  );
}

export default UserInfoContainer;
