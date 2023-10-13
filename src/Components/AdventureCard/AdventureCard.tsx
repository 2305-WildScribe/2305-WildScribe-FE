import './AdventureCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faPencil
} from '@fortawesome/free-solid-svg-icons';

interface AdventureProp {
  activity: string;
  date: string;
  notes: string;
  image_url: string;
  stress_level: string;
  hydration: number;
  diet: string;
  avdenture_id: number;
}

function AdventureCard({
  activity,
  date,
  notes,
  image_url,
  stress_level,
  hydration,
  diet,
  avdenture_id,
}: AdventureProp) {
  return (
    <div key={avdenture_id} className='adventure-card'>
      <div className='inner-card'>
        <img className='adventure-img' src={image_url} alt={activity} />
        <div className='card-text-wrapper'>
          <div className='top-line-info'>
            <div className='top-line-text'>
              <p><span>Activity Type: </span>{activity}</p>
              <p><span>Date: </span>{date}</p>
            </div>
            <div className='card-button-wrapper'>
              <button className='fa-btn'> <FontAwesomeIcon icon={faPencil} /></button>
              <button className='fa-btn'> <FontAwesomeIcon icon={faXmark} /></button>

            </div>
          </div>
          <div className='second-line-info'>
            <p><span>Hydration: </span>{hydration} oz</p>
            <p><span>Diet: </span>{diet}</p>
            <p><span>Stress Level:</span>{stress_level}</p>
          </div>
          <p><span>Notes: </span>{notes}</p>
        </div>
      </div>
    </div>
  );
}

export { AdventureCard };

export type { AdventureProp };
