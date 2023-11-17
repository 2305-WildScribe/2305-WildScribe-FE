import React from 'react';
import './AdventureJournalContainer.scss';
import Journal from '../Journal/Journal';

interface AdventureJournalContainerProps {
  activityTypes: string[];
}

function AdventureJournalContainer({
  activityTypes,
}: AdventureJournalContainerProps): React.ReactElement {

  let allActivities = activityTypes.map((activity) => {
    return <Journal key={activity} activity={activity} />;
  });

  return <div className='activity-container'>{allActivities} </div>;
}

export default AdventureJournalContainer;
