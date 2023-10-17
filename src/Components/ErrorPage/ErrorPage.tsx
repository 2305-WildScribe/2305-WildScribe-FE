import './ErrorPage.scss'

interface ErrorPageProps{
  message: string;
  
}

function ErrorPage({ message }: ErrorPageProps): React.ReactElement {
  let errorMsg = `${message}`
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