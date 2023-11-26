import './StatsPage.scss';
import { LineChart } from '@mui/x-charts/LineChart';

interface StatsPageProps {
  setViewStats: React.Dispatch<React.SetStateAction<boolean>>;
}

function StatsPage({ setViewStats }: StatsPageProps) {
  const handleStatsClick = () => {
    setViewStats(false);
  };

  return (
    <div className='stats-wrapper'>
      this is the stats page
      <button onClick={() => handleStatsClick()}>Back</button>
      <p>Caloric intake</p>
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
      <p>Hydration</p>
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
