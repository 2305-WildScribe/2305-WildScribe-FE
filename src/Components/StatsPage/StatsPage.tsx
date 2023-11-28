import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import HydrationGraph from '../Graphs/HydrationGraph';
import SleepGraph from '../Graphs/SleepGraph';
import StressGraph from '../Graphs/StressGraph';
import './StatsPage.scss';

interface StatsPageProps {
  setViewStats: React.Dispatch<React.SetStateAction<boolean>>;
  activity: string | undefined;
}

function StatsPage({ setViewStats, activity }: StatsPageProps) {
  let adventures = useAppSelector(selectAdventures).adventures;

  const handleStatsClick = () => {
    setViewStats(false);
  };

  let sortedByDate = adventures?.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const filteredAdventures = sortedByDate?.filter(
    (adventure) => adventure.activity === activity
  );

  return (
    <div className='stats-wrapper'>
      <div className='back-btn-wrapper'>
        <button className='back-button' onClick={() => handleStatsClick()}>
          Back
        </button>
      </div>
      <div className='graph-wrapper'>
      <label>Hydration levels</label>
        <HydrationGraph filteredAdventures={filteredAdventures} />
        <label>Stress levels</label>
        <StressGraph filteredAdventures={filteredAdventures} />
        <label> Hours slept / night</label>
        <SleepGraph filteredAdventures={filteredAdventures} />
      </div>
    </div>
  );
}

export default StatsPage;
