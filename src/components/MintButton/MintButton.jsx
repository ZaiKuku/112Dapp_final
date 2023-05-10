import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './MintButton.css'
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'


const MintButton = () => {
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const formData = e.target.value;
        // 分割地址
        const address = formData.split(',');


        // 與合約互動
        navigate('/FinalPage')
    }

    const handleOpen = () => {
        navigate('/FinalPage')
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="pos">
                    <textarea required className="formstyle" name="Mintaddress" placeholder="please split address with comma" />
                </div>
                <button  type="submit" className="rect">Mint</button>
            </form>

            <button onClick={handleOpen} className="rect2">Open</button>
        </div>
    )
}

export default MintButton




