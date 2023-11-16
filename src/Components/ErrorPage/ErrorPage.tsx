// import { useAdventures } from '../../Context/AdventureContext'
import { useAppSelector } from '../../Redux/hooks';
import { selectAdventures } from '../../Redux/slices/adventuresSlice';
import './ErrorPage.scss'



function ErrorPage(): React.ReactElement {
  // const{ error } = useAdventures()
  let error = useAppSelector(selectAdventures).error;


  let errorMsg = error
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