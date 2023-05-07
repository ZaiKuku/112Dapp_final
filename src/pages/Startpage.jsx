import MetamaskBlock from '../components/metamaskblock/metamaskblock'
import StartButton from '../components/StartButton/StartButton'
import './Startpage.css'
import React from 'react'


function Startpage() {

    return (
        <div>
            <div class="e0_3">
                <div class="e3_20"></div><span class="e1_2">NFT Generator</span>
                <MetamaskBlock />
                <div class="e4_48"></div>
                <div class="e4_50"></div>
            </div>
            <StartButton />
        </div >)
}


export default Startpage