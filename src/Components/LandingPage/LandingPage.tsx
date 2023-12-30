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
        <div className='landing-page-wrapper'>
            <div>Live feed goes here</div>
            <div className='right-box-wrapper'>
                <div className='button-wrapper'>
                    <button className='handle-login-button' onClick = {()=>handleLoginClick()}>Login</button>
                    <button className='handle-create-button' onClick = {()=>handleCreateAccountClick()}>Create Account</button>
                </div>
                <div className='mission-about-wrapper'>
                    <div className='mission-wrapper'>
                        <p>This is our mission. It is a good one.</p>
                    </div>
                    <div className='about-wrapper'>
                        <p>This is about Us</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage