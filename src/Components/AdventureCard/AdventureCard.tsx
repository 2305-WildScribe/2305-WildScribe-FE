import './AdventureCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Adventure } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { deleteAdventureAsync } from '../../Redux/slices/AsyncThunks';
import adventuresSlice, {
  selectAdventures,
  setSingleAdventure,
} from '../../Redux/slices/adventuresSlice';
import dayjs from 'dayjs';
import { RefObject, useEffect, useRef, useState } from 'react';

interface AdventureCardProps {
  adventure: Adventure;
  setSelectedLog: React.Dispatch<React.SetStateAction<string | null>>;
  zoomToLog: (coordinates: {
    lat: number;
    lng: number;
}, adventureId: string) => void;
  selectedLog: string | null;
}

function AdventureCard({
  adventure,
  setSelectedLog,
  zoomToLog,
  selectedLog,
}: AdventureCardProps): React.ReactElement {
  const {
    activity,
    date,
    beta_notes,
    image_url,
    stress_level,
    hydration,
    diet,
    hours_slept,
    adventure_id,
  } = adventure;

  const setLog = useAppSelector(selectAdventures).singleLog;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteAdventureAsync(adventure_id));
  };

  const handleEdit = () => {
    dispatch(setSingleAdventure(adventure));
    navigate('/edit');
  };

  const handleCardClick = () => {
    if (adventure.lat && adventure.lon && adventure.adventure_id !== undefined) {
      const coords = {
        lat: adventure.lat,
        lng: adventure.lon,
      };
      zoomToLog(coords, adventure.adventure_id);
      console.log(coords)
    }
  };

  let formattedDate = dayjs(date).format('MM-DD-YYYY');

  const [validId, setValidId] = useState<string>('');

  const currentCardRef = useRef<any>({});

  useEffect(() => {
  if(setLog && currentCardRef.current[setLog]){
    currentCardRef.current[setLog].scrollIntoView({ behavior: 'smooth'})
    
  }
  }, [setLog]);

  return (
    <div
      key={adventure_id}
      id={`${adventure_id}`}
      ref={(ref) =>setLog && (currentCardRef.current[setLog] = ref)}
      className='adventure-card'
      onClick={() => handleCardClick()}
    >
      <div className='inner-card'>
        <img className='adventure-img' src={image_url} alt={activity} />
        <div className='card-text-wrapper'>
          <div className='top-line-info'>
            <div className='top-line-text'>
              {date && (
                <p>
                  <span>Date: </span>
                  {formattedDate}
                </p>
              )}
            </div>
            <div className='card-button-wrapper'>
              <button
                className='fa-btn pencil-btn'
                onClick={() => handleEdit()}
              >
                {' '}
                <FontAwesomeIcon icon={faPencil} className='fa-icon' />
              </button>
              <button
                className='fa-btn trash-btn'
                onClick={() => handleDelete()}
              >
                {' '}
                <FontAwesomeIcon icon={faTrash} className='fa-icon' />
              </button>
            </div>
          </div>
          <div className='second-line-info'>
            {hydration && (
              <p>
                <span>Hydration: </span>
                {hydration}
              </p>
            )}
            {diet && (
              <p>
                <span>Calories: </span>
                {diet}
              </p>
            )}
            {stress_level && (
              <p>
                <span>Stress Level: </span>
                {stress_level}
              </p>
            )}
            {hours_slept && hours_slept > 0 && (
              <p>
                <span>Hours Slept: </span>
                {hours_slept}
              </p>
            )}
          </div>
          {beta_notes && (
            <p>
              <span>Notes: </span>
              {beta_notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { AdventureCard };
