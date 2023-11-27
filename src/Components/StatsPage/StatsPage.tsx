import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import './StatsPage.scss';
import { LineChart } from '@mui/x-charts/LineChart';

import dayjs from 'dayjs';

interface StatsPageProps {
  setViewStats: React.Dispatch<React.SetStateAction<boolean>>;
  activity: string | undefined;
}

function StatsPage({ setViewStats, activity }: StatsPageProps) {
  let adventures = useAppSelector(selectAdventures).adventures;
  let activityTypes = useAppSelector(selectAdventures).activityTypes;

  const handleStatsClick = () => {
    setViewStats(false);
  };

  let sortedByDate = adventures?.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredAdventures = sortedByDate?.filter(
    (adventure) => adventure.activity === activity
  );

  const dateData = filteredAdventures?.map(
    (adventure) => new Date(adventure.date)
  );

  const hydrationData = filteredAdventures.map(adventure => adventure.hydration)

    console.log(hydrationData)

  return (
    <div className='stats-wrapper'>
      this is the stats page
      <button onClick={() => handleStatsClick()}>Back</button>
      <p>Caloric intake</p>
      <LineChart
        xAxis={[
          {
            id: 'Years',
            data: dateData,
            scaleType: 'time',
            valueFormatter: (date) => {
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const year = String(date.getFullYear()).slice(-2);
              console.log(`${month}/${day}/${year}`);
              return `${month}/${day}/${year}`;
            },
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2],
          },
        ]}
        width={500}
        height={300}
      />
      <p>Hydration</p>
      <LineChart
        xAxis={[
          {
            id: 'Years',
            data: dateData,
            scaleType: 'time',
            valueFormatter: (date) => {
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const year = String(date.getFullYear()).slice(-2);
              console.log(`${month}/${day}/${year}`);
              return `${month}/${day}/${year}`;
            },
          },
        ]}
        series={[
          {
            data: [8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
      <p>Stress level</p>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
      <p>Hours slept</p>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}

export default StatsPage;
