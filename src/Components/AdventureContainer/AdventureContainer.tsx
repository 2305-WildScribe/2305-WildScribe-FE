import { AdventureCard, AdventureProp } from '../AdventureCard/AdventureCard';
import './AdventureContainer.scss';

interface AdventureContainerProps {
  adventures: AdventureProp[];
  // activity: string;
  // date: string;
  // notes: string;
  // image_url: string;
  // stress_level: string;
  // hydration: number;
  // diet: string;
  // avdenture_id: number;
}

function AdventureContainer({ adventures }: AdventureContainerProps) {
  console.log('HERE', adventures);
  const adventureCards = adventures.map((adventure) => {
    console.log(adventure);
    return (
      <AdventureCard
        activity={adventure.activity}
        date={adventure.date}
        notes={adventure.notes}
        image_url={adventure.image_url}
        stress_level={adventure.stress_level}
        hydration={adventure.hydration}
        diet={adventure.diet}
        avdenture_id={adventure.avdenture_id}
      />
    );
  });

  return <div>{adventureCards}</div>;
}

export default AdventureContainer;
