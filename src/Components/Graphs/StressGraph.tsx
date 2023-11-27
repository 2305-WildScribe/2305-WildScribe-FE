import 'HydrationGraph.scss'

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

function StressGraph({filteredAdventures}: StressGraphProps) {
  return (
    <div>
      
    </div>
  )
}

export default StressGraph
