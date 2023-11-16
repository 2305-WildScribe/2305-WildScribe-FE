import './AdventureContainer.scss';
import { AdventureCard } from '../AdventureCard/AdventureCard';
import { Adventure } from '../../types';

// interface AdventureContainerProps {
//   searchedAdventures: Adventure[];
// }
// function AdventureContainer({searchedAdventures} : AdventureContainerProps): React.ReactElement {

function AdventureContainer(): React.ReactElement {

  // function sortByDateAscending(adventures: Adventure[]) {
  //   return adventures.slice().sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);
  //     return dateB.getTime() - dateA.getTime();
  //   });
  // }

  // const sortedAdventures = sortByDateAscending(searchedAdventures);

  // const adventureCards = sortedAdventures.map((adventure) => {
  //   return (
  //     <div key={adventure.adventure_id}>
  //       <AdventureCard adventure={adventure} />
  //     </div>
  //   );
  // });

  // return <div className='adventure-card-container'>{adventureCards}</div>;
  return <div className='adventure-card-container'>container</div>;

}

export default AdventureContainer;
