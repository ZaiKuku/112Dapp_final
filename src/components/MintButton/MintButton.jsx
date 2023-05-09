import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './MintButton.css'


const MintButton = () => {
    const navigate = useNavigate();
    const handleclick = () => {
        navigate('/FinalPage')
    }

    return (
        <div>
            <form>
                <div className="pos">
                    <textarea required  className="formstyle" name="Mintaddress" placeholder="please split address with comma" />
                </div>
            </form>
            <button><div id='rectangle' class='rectangle'></div><div id='Mint' class='Mint'>Mint</div></button>
            <button><div id='rectangle' class='rectangle2'></div><div id='Open' class='Open'>Open</div></button>
        </div>
    )
}

export default MintButton




