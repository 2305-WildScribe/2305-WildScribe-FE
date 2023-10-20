import './AdventureContainer.scss';
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';

interface AdventureContainerProps {
  adventures: Adventure[];
  deleteAdventureOnDom: (adventure_id: string | undefined) => void;
  setSingleAdventure: React.Dispatch<
    React.SetStateAction<Adventure | undefined>
  >;
}

function AdventureContainer({
  adventures,
  deleteAdventureOnDom,
  setSingleAdventure,
}: AdventureContainerProps): React.ReactElement {

  
  function sortByDateAscending(adventures: Adventure[]) {
    return adventures.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const sortedAdventures = sortByDateAscending(adventures)

  const adventureCards = sortedAdventures.map((adventure) => {
    console.log('date -->',typeof(adventure.date))
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
