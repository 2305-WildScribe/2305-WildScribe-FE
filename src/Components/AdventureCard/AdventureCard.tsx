import './AdventureCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';

import Adventure from '../../../types';

function AdventureCard({
  activity,
  date,
  notes,
  image_url,
  stress_level,
  hydration,
  diet,
  sleep,
  extraDietNotes,
  extraSleepNotes,
  adventure_id,
}: Adventure): React.ReactElement {
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
              <button className='fa-btn'>
                {' '}
                <FontAwesomeIcon icon={faPencil} className='fa-icon' />
              </button>
              <button className='fa-btn'>
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
                <span>Diet: </span>
                {diet}
              </p>
            )}
            {stress_level && (
              <p>
                <span>Stress Level:</span>
                {stress_level}
              </p>
            )}
            {sleep && (
              <p>
                <span>Sleep Quality:</span>
                {sleep}
              </p>
            )}
          </div>
          {extraDietNotes && (
            <p>
              <span>Extra Diet Notes: </span>
              {extraDietNotes}
            </p>
          )}
          {extraSleepNotes && (
            <p>
              <span>Extra Stress Notes: </span>
              {extraSleepNotes}
            </p>
          )}
          {notes && (
            <p>
              <span>Beta Notes: </span>
              {notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { AdventureCard };
