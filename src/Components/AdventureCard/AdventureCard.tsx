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

function AdventureCard({activity, date, notes, image_url, stress_level, hydration, diet, avdenture_id} : AdventureProp) {
  return <div>Adventure</div>;
}

export {AdventureCard}

export type {AdventureProp}