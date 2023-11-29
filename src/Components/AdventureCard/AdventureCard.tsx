import './AdventureCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Adventure } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { deleteAdventureAsync } from '../../Redux/slices/AsyncThunks';
import { setSingleAdventure } from '../../Redux/slices/adventuresSlice';

interface AdventureCardProps {
  adventure: Adventure;
}

function AdventureCard({ adventure }: AdventureCardProps): React.ReactElement {

  const {
    activity,
    date,
    beta_notes,
    image_url,
    stress_level,
    hydration,
    diet,
    hours_slept,
    diet_hydration_notes,
    sleep_stress_notes,
    adventure_id,
  } = adventure;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteAdventureAsync(adventure_id));
  };

  const handleEdit = () => {
    dispatch(setSingleAdventure(adventure));
    navigate('/edit');
  };

  return (
    <div key={adventure_id} id={`${adventure_id}`} className='adventure-card'>
      <div className='inner-card'>
        <img className='adventure-img' src={image_url} alt={activity} />
        <div className='card-text-wrapper'>
          <div className='top-line-info'>
            <div className='top-line-text'>
              {date && (
                <p>
                  <span>Date: </span>
                  {date}
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
            {hours_slept > 0 && (
              <p>
                <span>Hours Slept: </span>
                {hours_slept}
              </p>
            )}
          </div>
          {/*   */}
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
