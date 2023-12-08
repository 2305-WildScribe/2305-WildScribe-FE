import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
// import { useAppDispatch, useAppSelector } from '../../Redux/hooks';


function LandingPage(): React.ReactElement {
    const navigate = useNavigate();
    const handleLoginClick = ()=>{
        navigate('/login');
    }
    const handleCreateAccountClick = ()=>{
        navigate('/create')
    }
    return(
        <div>This is the landing page

            <button onClick = {()=>handleLoginClick()}>Login</button>
            <button onClick = {()=>handleCreateAccountClick()}>Create Account</button>
            <button>Our Mission</button>
            <button>About Us</button>

        </div>
    )
}

export default LandingPage