import './AdventureContainer.scss';
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';

// interface AdventureContainerProps {
//   searchedAdventures: Adventure[];
// }
// function AdventureContainer({searchedAdventures} : AdventureContainerProps): React.ReactElement {

function AdventureContainer(): React.ReactElement {
  let adventures = useAppSelector(selectAdventures).adventures;

  const activity = useParams().activity;
  console.log('activity', activity);

  const filterAdventures = () => {
    let filtered = adventures.filter(
      (adventure) => adventure.activity === activity
    );
    return filtered
  };

  function sortByDateAscending() {
    return filterAdventures().slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const adventureCards = sortByDateAscending().map((adventure) => {
    return (
      <div key={adventure.adventure_id}>
        <AdventureCard adventure={adventure} />
      </div>
    );
  });

  return <div className='adventure-card-container'>{adventureCards}</div>;
  // return <div className='adventure-card-container'>container</div>;
}

export default AdventureContainer;
