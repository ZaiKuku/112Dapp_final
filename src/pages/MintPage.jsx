import Background from '../components/Background/Background'
import MintButton from '../components/MintButton/MintButton'
import './MintPage.css'


const MintPage = () => {
    return (
        <div>
            <Background />
            <span className="mint">Mint</span>
            <MintButton />
            <span className="MysteryBox">Open Mystery Box</span>
            <div className="box"/>
            <div className='UFO'/>
        </div>)

}

export default MintPage
