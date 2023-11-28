import './StressGraph.scss';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { Adventure } from '../../types';

interface StressGraphProps {
  filteredAdventures: Adventure[];
}

function StressGraph({ filteredAdventures }: StressGraphProps) {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  let stressAsNumericalData: { [key: string]: number } = {
    'None': 1,
    Low: 2,
    Moderate: 3,
    High: 4,
    Max: 5,
  };

  const data = filteredAdventures.map((adventure) => {
    return {
      stress: stressAsNumericalData[adventure.stress_level],
      date: adventure.date,
    };
  });

  let stressData = {
    labels: data.map((object) => object.date),
    datasets: [
      {
        label: 'Stress Level',
        data: data.map((object) => {
          return object.stress;
        }),
        backgroundColor: '#115C80',
      },
    ],
  };

  const stressOptions = {
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => {
            const stressValueToString: { [key: string]: string } = {
              '1': 'None',
              '2': 'Low',
              '3': 'Moderate',
              '4': 'High',
              '5': 'Max',
            };
            return stressValueToString[String(value)];
          },
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const stressValueToString: { [key: string]: string } = {
              '1': 'None',
              '2': 'Low',
              '3': 'Moderate',
              '4': 'High',
              '5': 'Max',
            };

            const numericValue = context.parsed.y;

            const stringValue = stressValueToString[String(numericValue)];

            return `${stringValue}`;
          },
        },
      },
    },
  };

  return (
    <div className='stress-graph'>
      {' '}
      <Bar data={stressData} options={stressOptions}></Bar>
    </div>
  );
}

export default StressGraph;
