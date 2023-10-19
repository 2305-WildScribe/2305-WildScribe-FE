import './AdventureCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { deleteAdventure } from '../../apiCalls';
import { Adventure } from '../../types';

interface AdventureCardProps {
  adventure: Adventure;  
  deleteAdventureOnDom: (adventure_id: string | undefined) => void;
}

function AdventureCard({
  adventure,
  deleteAdventureOnDom,
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
    diet_hydration_notes,
    sleep_stress_notes,
    adventure_id,
  } = adventure;

  const handleDelete = () => {
    deleteAdventure(adventure_id)
    deleteAdventureOnDom(adventure_id);
  }

  return (
    <div key={adventure_id} id={`${adventure_id}`} className='adventure-card'>
      <div className='inner-card'>
        <img className='adventure-img' src={image_url} alt={activity} />
        <div className='card-text-wrapper'>
          <div className='top-line-info'>
            <div className='top-line-text'>
              {activity && (
                <p>
                  <span>Activity Type: </span>
                  {activity}
                </p>
              )}
              {date && (
                <p>
                  <span>Date: </span>
                  {date}
                </p>
              )}
            </div>
            <div className='card-button-wrapper'>
              <button className='fa-btn' >
                {' '}
                <FontAwesomeIcon icon={faPencil} className='fa-icon' />
              </button>
              <button className='fa-btn' onClick={() => handleDelete()}>
                {' '}
                <FontAwesomeIcon icon={faTrash} className='fa-icon'/>
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
                <span>Diet: </span>
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
                <span>Hours slept: </span>
                {hours_slept}
              </p>
            )}
          </div>
          {diet_hydration_notes && (
            <p>
              <span>Extra Diet Notes: </span>
              {diet_hydration_notes}
            </p>
          )}
          {sleep_stress_notes && (
            <p>
              <span>Extra Stress Notes: </span>
              {sleep_stress_notes}
            </p>
          )}
          {beta_notes && (
            <p>
              <span>Beta Notes: </span>
              {beta_notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { AdventureCard };
