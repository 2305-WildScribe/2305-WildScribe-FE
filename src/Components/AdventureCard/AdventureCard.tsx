import './AdventureCard.scss';

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
      <img className='adventure-img' src={image_url} alt={activity} />
      <div className='card-text-wrapper'>
      <p>{activity}</p>
      <p>{date}</p>
      <p>{notes}</p>
      <p>{stress_level}</p>
      <p>{hydration}</p>
      <p>{diet}</p>
      </div>
    </div>
  );
}

export { AdventureCard };

export type { AdventureProp };
