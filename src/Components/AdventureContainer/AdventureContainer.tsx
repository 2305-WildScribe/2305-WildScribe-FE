import { AdventureCard, AdventureProp } from '../AdventureCard/AdventureCard';
import './AdventureContainer.scss';

interface AdventureContainerProps {
  adventures: AdventureProp[];
}

function AdventureContainer({ adventures }: AdventureContainerProps) {
  console.log('HERE', adventures);
  const adventureCards = adventures.map((adventure) => {
    console.log(adventure);
    return (
      <div>
        <AdventureCard
          activity={adventure.activity}
          date={adventure.date}
          notes={adventure.notes}
          image_url={adventure.image_url}
          stress_level={adventure.stress_level}
          hydration={adventure.hydration}
          diet={adventure.diet}
          avdenture_id={adventure.avdenture_id}
          key={adventure.avdenture_id}
        />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;
