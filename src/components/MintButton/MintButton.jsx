import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './MintButton.css'
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'


const MintButton = () => {
    const navigate = useNavigate();
    
    const handleclick = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            Mintaddress: formData.get('Mintaddress'),
        };
        // 分割地址
        const address = data.Mintaddress.split(',');
        

        // 與合約互動
        navigate('/Mint')
    }

    return (
        <div>
            <form>
                <div className="pos">
                    <textarea required  className="formstyle" name="Mintaddress" placeholder="please split address with comma" />
                </div>
                <button onClick={handleclick} type="submit"><div id='rectangle' class='rectangle'></div><div id='Mint' class='Mint'>Mint</div></button>
            </form>
            
            <button><div id='rectangle' class='rectangle2'></div><div id='Open' class='Open'>Open</div></button>
        </div>
    )
}

export default MintButton




