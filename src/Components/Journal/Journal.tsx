import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import { Adventure } from '../../types';
import './Journal.scss';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

interface JournalProps {
  activity: string;
}

function Journal({ activity }: JournalProps) {
  const navigate = useNavigate();

  const handleJournalClick = () => {
    navigate(`/${activity}`);
  };

  let adventures = useAppSelector(selectAdventures).adventures;

  const lastLog = () => {
    let filteredLogs = adventures?.filter(
      (adventure) => adventure.activity === activity
    );

    const latest = filteredLogs?.reduce(
      (accum, adventure) => {
        const adventureDate = dayjs(adventure?.date);
        const accumDate = dayjs(accum?.date);
        if (adventureDate.isAfter(accumDate)) {
          accum = adventure;
        }
        return accum;
      },
      { date: '0' }
    );

    if (latest?.date === '0') {
      return 'No logs yet';
    } else {
      return dayjs(latest?.date).format('MM-DD-YYYY');
    }
  };

  return (
    <div className='activity-card' onClick={() => handleJournalClick()}>
      {activity}
      {adventures && <div className='last-log'>Last log: {lastLog()}</div>}
    </div>
  );
}

export default Journal;
