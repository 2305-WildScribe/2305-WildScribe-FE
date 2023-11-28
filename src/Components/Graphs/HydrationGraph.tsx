import './HydrationGraph.scss';

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

interface HydrationGraphProps {
  filteredAdventures: Adventure[];
}

function HydrationGraph({ filteredAdventures }: HydrationGraphProps) {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  let hydrationAsNumericalData: { [key: string]: number } = {
    Dehydrated: 1,
    'Somewhat Hydrated': 2,
    Hydrated: 3,
    'Very Hydrated': 4,
  };

  const hydrationData = filteredAdventures.map((adventure) => {
    return {
      hydration: hydrationAsNumericalData[adventure.hydration],
      date: adventure.date,
    };
  });

  let data = {
    labels: hydrationData.map((object) => object.date),
    datasets: [
      {
        label: 'Hydration',
        data: hydrationData.map((object) => object.hydration),
        backgroundColor: '#01204E',
      },
    ],
  };

  const hydrationOptions = {
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => {
            const hydratedValueToString: { [key: string]: string } = {
              '1': 'Dehydrated',
              '2': 'Somewhat Hydrated',
              '3': 'Hydrated',
              '4': 'Very Hydrated',
            };
            return hydratedValueToString[String(value)];
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
            const hydratedValueToString: { [key: string]: string } = {
              '1': 'Dehydrated',
              '2': 'Somewhat Hydrated',
              '3': 'Hydrated',
              '4': 'Very Hydrated',
            };

            const numericValue = context.parsed.y;

            const stringValue = hydratedValueToString[String(numericValue)];

            return `${stringValue}`;
          },
        },
      },
    },
  };

  return (
    <div className='hydro-graph'>
      {' '}
      <Bar data={data} options={hydrationOptions}></Bar>
    </div>
  );
}

export default HydrationGraph;
