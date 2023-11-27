import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import HydrationGraph from '../Graphs/HydrationGraph';
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
    return dateB.getTime() - dateA.getTime();
  });

  const filteredAdventures = sortedByDate?.filter(
    (adventure) => adventure.activity === activity
  );

  return (
    <div className='stats-wrapper'>
      this is the stats page
      <button onClick={() => handleStatsClick()}>Back</button>
      <HydrationGraph filteredAdventures={filteredAdventures} />
    </div>
  );
}

export default StatsPage;
