import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';

import './AdventureContainer.scss';

interface AdventureContainerProps {
  adventures: Adventure[];
}

function AdventureContainer({
  adventures,
}: AdventureContainerProps): React.ReactElement {
  const adventureCards = adventures.map((adventure) => {
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard
          user_id={adventure.user_id}
          activity={adventure.activity}
          date={adventure.date}
          beta_notes={adventure.beta_notes}
          image_url={adventure.image_url}
          stress_level={adventure.stress_level}
          hydration={adventure.hydration}
          diet={adventure.diet}
          hours_slept={adventure.hours_slept}
          diet_hydration_notes={adventure.diet_hydration_notes}
          sleep_stress_notes={adventure.sleep_stress_notes}
          adventure_id={adventure.adventure_id}
        />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;
