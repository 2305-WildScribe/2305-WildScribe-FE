import React from 'react';
import './AdventureJournalContainer.scss';
import Journal from '../Journal/Journal';
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';

function AdventureJournalContainer(): React.ReactElement {
  let activityTypes = useAppSelector(selectAdventures).activityTypes;
  let allActivities = activityTypes.map((activity) => {
    return <Journal key={activity} activity={activity} />;
  });

  return <div className='activity-container'>{allActivities} </div>;
}

export default AdventureJournalContainer;
