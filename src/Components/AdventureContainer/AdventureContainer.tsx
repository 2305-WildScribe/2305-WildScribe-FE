import './AdventureContainer.scss';
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';

function AdventureContainer(): React.ReactElement {
  let adventures = useAppSelector(selectAdventures).adventures;


  function sortByDateAscending(adventures: Adventure[]) {
    return adventures.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const sortedAdventures = sortByDateAscending(adventures);

  const adventureCards = sortedAdventures.map((adventure) => {
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard adventure={adventure} />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
}

export default AdventureContainer;
