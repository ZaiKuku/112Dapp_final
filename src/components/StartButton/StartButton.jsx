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
            {!clicked && <button onClick={handleclick} className='start'>Start</button>}
            {clicked && <>
                <button onClick={handleclick_new} className='start'>New</button>
                <button onClick={handleclick_old} className='start'>Old</button>
            </>}
        </div>
    );
};

export default StartButton;