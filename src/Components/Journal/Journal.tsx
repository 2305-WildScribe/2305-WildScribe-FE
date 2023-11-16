import './Journal.scss'
import { useNavigate } from 'react-router-dom'

interface JournalProps {
  activity: string
}

function Journal({activity}: JournalProps) {
  const navigate = useNavigate()
  const handleJournalClick = () => {
    navigate(`/${activity}`)
  }

  return (
    <div className='activity-card' onClick={() => handleJournalClick()}>
      {activity}
    </div>
  )
}

export default Journal
