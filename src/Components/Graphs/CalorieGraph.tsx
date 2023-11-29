import './CalorieGraph.scss'
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Adventure } from '../../types';

interface CalorieGraphProps {
  filteredAdventures: Adventure[];
}

function CalorieGraph({ filteredAdventures }: CalorieGraphProps): React.ReactElement  {
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

  let data = filteredAdventures.map((adventure) => {
    return {
      calories: adventure.diet,
      date: adventure.date,
    };
  });

  const calorieData = {
    labels: data.map((object) => object.date),
    datasets: [
      {
        data: data.map((object) => object.calories),
        backgroundColor: 'darkGreen',
        borderColor: 'darkGreen',
      },
    ],
  };

  const dietOptions = {
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
    <div className='diet-graph'>
      <Line data={calorieData} options={dietOptions}></Line>
    </div>
  );
}

export default CalorieGraph;
