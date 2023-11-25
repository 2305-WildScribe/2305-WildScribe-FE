import './UserInfoContainer.scss';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import dayjs from 'dayjs';
import { PieChart } from '@mui/x-charts/PieChart';

function UserInfoContainer() {
  let adventures = useAppSelector(selectAdventures).adventures;

  function findMostRecentLog() {
    let sorted = adventures?.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return sorted[0];
  }

  const mostRecent = findMostRecentLog();
  const mostRecentDate = dayjs(mostRecent?.date)?.format('MM-DD-YYYY');
  const mostRecentActivity = findMostRecentLog()?.activity;

  return (
    <div className='user-info-wrapper'>
      Your last log was on {mostRecentDate} in your {mostRecentActivity} journal
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default UserInfoContainer;
