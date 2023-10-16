import { AdventureCard } from '../AdventureCard/AdventureCard';
import  { Adventure }  from '../../../types';

import './AdventureContainer.scss';

interface AdventureContainerProps {
  adventures: Adventure[];
}

function AdventureContainer({ adventures }: AdventureContainerProps): React.ReactElement {
  const adventureCards = adventures.map((adventure) => {
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard
          activity={adventure.activity}
          date={adventure.date}
          notes={adventure.notes}
          image_url={adventure.image_url}
          stress_level={adventure.stress_level}
          hydration={adventure.hydration}
          diet={adventure.diet}
          sleep={adventure.sleep}
          extraDietNotes={adventure.extraDietNotes}
          extraSleepNotes={adventure.extraSleepNotes}
          adventure_id={adventure.adventure_id}
        />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;
