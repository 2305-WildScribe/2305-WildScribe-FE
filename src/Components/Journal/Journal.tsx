import React from 'react'
import './Journal.scss'

interface JournalProps {
  activity: string
}

function Journal({activity}: JournalProps) {
  return (
    <div className='activity-card'>
      {activity}
    </div>
  )
}

export default Journal
