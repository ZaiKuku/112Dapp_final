import StartButton from '../components/StartButton/StartButton'
import Background from '../components/Background/Background'
import './Startpage.css'
import React from 'react'


function Startpage() {

    return (
        <div>
            <Background />
            <div className="e4_50"></div>
            <span className="e1_2">NFT Generator</span>
            <StartButton />
        </div >)
}


export default Startpage