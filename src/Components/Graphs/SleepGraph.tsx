import './SleepGraph.scss'
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Adventure } from '../../types';

interface SleepGraphProps {
  filteredAdventures: Adventure[];
}

function SleepGraph({ filteredAdventures }: SleepGraphProps): React.ReactElement  {
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

  let data = filteredAdventures.map((adventure) => {
    return {
      hours_slept: adventure.hours_slept,
      date: adventure.date,
    };
  });

  const sleepData = {
    labels: data.map((object) => object.date),
    datasets: [
      {
        data: data.map((object) => object.hours_slept),
        backgroundColor: 'purple',
        borderColor: 'purple',
      },
    ],
  };

  const sleepOptions = {
    scales: {
      y: {
        ticks: {
          color: 'black', 
        },
        grid: {
          display: false, 
        },
      },
      x: {
        ticks: {
          color: 'black', 
        },
        grid: {
          display: false, 
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='sleep-graph'>
      <Line data={sleepData} options={sleepOptions}></Line>
    </div>
  );
}

export default SleepGraph;
