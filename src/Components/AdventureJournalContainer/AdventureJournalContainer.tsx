import React from 'react';
import './AdventureJournalContainer.scss';
import Journal from '../Journal/Journal';

interface AdventureJournalContianerProps {
  activityTypes: string[];
}

function AdventureJournalContianer({
  activityTypes,
}: AdventureJournalContianerProps): React.ReactElement {
  let allActivities = activityTypes.map((activity) => {
    return <Journal activity={activity} />;
  });

  return( 
  <div className='activity-container'>{allActivities} </div>);
}

export default AdventureJournalContianer;
