import './Homepage.scss';
import { AdventureProp } from '../AdventureCard/AdventureCard';
import AdventureContainer from '../AdventureContainer/AdventureContainer';

interface HomepageProps {
  adventures: AdventureProp[];
}

function Homepage({ adventures }: HomepageProps) {
  return (
    <div>
      <main className='homepage'>
        <AdventureContainer adventures={adventures} />
      </main>
    </div>
  );
}

export default Homepage;
