import './Homepage.scss';
import { Adventure } from '../../types';
import AdventureContainer from '../AdventureContainer/AdventureContainer';

interface HomepageProps {
  adventures: Adventure[];
}

function Homepage({ adventures }: HomepageProps): React.ReactElement {
  return (
    <div id='home-main'>
      {adventures.length ? (
        <>
          <button className='search-btn'>Search Logs</button>
          <AdventureContainer adventures={adventures} />
        </>
      ) : (
        <p className='welcome-message'>
          Welcome to WildScribe, an app that lets track your adventures,
          training, beta, etc. in order to improve in the activities you enjoy.
          To get started, log your first adventure!
        </p>
      )}
    </div>
  );
}

export default Homepage;
