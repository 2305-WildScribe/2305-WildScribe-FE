import './AdventureContainer.scss'
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';

interface AdventureContainerProps {
  adventures: Adventure[];
  deleteAdventureOnDom: (adventure_id: string | undefined) => void;
  setSingleAdventure: React.Dispatch<React.SetStateAction<Adventure | undefined>>;
}

function AdventureContainer({
  adventures,
  deleteAdventureOnDom,
  setSingleAdventure
}: AdventureContainerProps): React.ReactElement {

  
  const adventureCards = adventures.map((adventure) => {
    
    
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard
          adventure={adventure}  
          deleteAdventureOnDom={deleteAdventureOnDom}
          adventures={adventures}
          setSingleAdventure={setSingleAdventure}
          />
      </div>
    );
  });
  
 
  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;



