import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';

interface AdventureContainerProps {
  adventures: Adventure[];
  deleteAdventureOnDom: (adventure_id: string | undefined) => void;
}

function AdventureContainer({
  adventures,
  deleteAdventureOnDom
}: AdventureContainerProps): React.ReactElement {
  const adventureCards = adventures.map((adventure) => {
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard
          adventure={adventure}  
          deleteAdventureOnDom={deleteAdventureOnDom}
        />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;



