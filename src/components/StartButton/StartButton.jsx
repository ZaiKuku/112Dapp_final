import './StartButton.css'
import SettingPage from '../../pages/SettingPage'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

const StartButton = () => {
    const [clicked , setclicked]= useState(false);
    const navigate = useNavigate();
    const handleclick = () => {
        setclicked(true)
    }

    const handleclick_new = () => {
        navigate('/MintSetting')
    }

    return (
        <div>
            {!clicked && <button onClick={handleclick}><div id='rectangle' class='rectangle'></div><div id='start' class='start'>Start</div></button>}
            {clicked && <button onClick={handleclick_new}><div id='rectangle' class='rectangle'></div><div id='start' class='start'>New</div></button>}
        </div>
    );
};

export default StartButton;