import './Homepage.scss';
import  Adventure  from '../../../types';
import AdventureContainer from '../AdventureContainer/AdventureContainer';

interface HomepageProps {
  adventures: Adventure[];
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
