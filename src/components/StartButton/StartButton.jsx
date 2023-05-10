import './StartButton.css'
import SettingPage from '../../pages/SettingPage'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

const StartButton = () => {
    const [clicked, setclicked] = useState(false);
    const navigate = useNavigate();

    const handleclick = () => {
        setclicked(true)
    }

    const handleclick_new = () => {
        navigate('/MintSetting')
    }

    const handleclick_old = () => {
    }

    return (
        <div>
            {!clicked && <button onClick={handleclick}><div id='rectangle' className='rect'></div><div id='start' className='start'>Start</div></button>}
            {clicked && <>
                <button onClick={handleclick_new}><div id='rectangle' className='rect'></div><div id='start' className='start'>New</div></button>
                <button onClick={handleclick_old}><div id='rectangle' className='rect'></div><div id='start' className='start'>Old</div></button>
            </>}
        </div>
    );
};

export default StartButton;