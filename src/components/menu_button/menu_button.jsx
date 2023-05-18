import { useState } from 'react'
import './menu_button.css'
import { useNavigate } from 'react-router-dom'


const Menu_button = () => {
    const [clicked, setMenu] = useState(false);
    const Navigate = useNavigate();
    const handleclick = () => {
        setMenu(!clicked);
    }

    const go_home = () => {
        Navigate('/');
    }

    const go_MintSetting = () => {
        Navigate('/MintSetting')
    }

    const go_OldProjectPages = () => {
        Navigate('/OldProjectPages')
    }
    return (
        <div>
            <button className='menu' onClick={handleclick}/>
            {clicked && 
                <menu className='rect_menu'>
                    <button className='buttons' onClick={go_home}> <span className='fontofbutton'>Home</span> </button>
                    <button className='buttons' onClick={go_MintSetting}> <span className='fontofbutton'>New Project</span> </button>
                    <button className='buttons' onClick={go_OldProjectPages}><span className='fontofbutton'>History</span></button>
                </menu>}
        </div>
    )
}

export default Menu_button;