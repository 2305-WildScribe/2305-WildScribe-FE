import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
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
        let adventureDate = dayjs(adventure?.date);
        let accumDate = dayjs(accum?.date);

        if (adventureDate.isAfter(accumDate)) {
          accum = adventure;
        }
        return accum;
      },
      { date: '1001-01-01' }
    );

    if (latest?.date === '1001-01-01') {
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
