import { useAdventures } from '../../Context/AdventureContext'
import './ErrorPage.scss'

// interface ErrorPageProps{
//   message: string;
  
// }

function ErrorPage(): React.ReactElement {
  const{ error } = useAdventures()

  let errorMsg = `${error.message}`
  if(errorMsg === ''){
    errorMsg = 'Error: 404 page not found'
  }
  return (
    <div className='error-msg'>
      <p>{errorMsg} </p>
    </div>
  );
}

export default ErrorPage