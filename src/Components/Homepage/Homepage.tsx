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
        <div className='inner-homepage'>
          <button className='search-btn'>Search Logs</button>
        <AdventureContainer adventures={adventures} />
        </div>
      </main>
    </div>
  );
}

export default Homepage;
