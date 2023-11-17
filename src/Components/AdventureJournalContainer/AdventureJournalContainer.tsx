import React from 'react';
import './AdventureJournalContainer.scss';
import Journal from '../Journal/Journal';

interface AdventureJournalContainerProps {
  activityTypes: string[];
}

function AdventureJournalContainer({
  activityTypes,
}: AdventureJournalContainerProps): React.ReactElement {
  console.log(activityTypes)


  let allActivities = activityTypes.map((activity) => {
    return <Journal activity={activity} />;
  });

  return <div className='activity-container'>{allActivities} </div>;
}

export default AdventureJournalContainer;
