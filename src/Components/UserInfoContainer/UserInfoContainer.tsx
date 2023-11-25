import './UserInfoContainer.scss';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import dayjs from 'dayjs';
import { PieChart } from '@mui/x-charts/PieChart';

function UserInfoContainer() {
  let adventures = useAppSelector(selectAdventures).adventures;
  let activityTypes = useAppSelector(selectAdventures).activityTypes;

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

  const pieChartData = () => {
    const types = activityTypes.map((type, index) => {
      let data = { id: index, value: 0, label: '' };
      data.label += type;
      adventures.forEach((adventure) => {
        if (adventure.activity === type) {
          data.value += 1;
        }
      });
      return data;
    });
    return types;
  };

  console.log(pieChartData());
  const palette = ['#01204E', '#028391', '#115C80', '#008081', '#479685' ];
  
  return (
    <div className='user-info-wrapper'>
      Your last log was on {mostRecentDate} in your {mostRecentActivity} journal
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
  );
}

export default UserInfoContainer;
