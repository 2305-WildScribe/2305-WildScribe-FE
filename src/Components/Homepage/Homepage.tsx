import './Homepage.scss'
import { AdventureProp } from '../AdventureCard/AdventureCard'
import AdventureContainer from '../AdventureContainer/AdventureContainer'

interface HomepageProps{
  adventures: AdventureProp[];
}

function Homepage ({adventures} : HomepageProps) {
  
  return(
    <div>
      <AdventureContainer adventures={adventures}/>
    </div>
  )
}

export default  Homepage