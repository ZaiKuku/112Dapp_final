import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './MintButton.css'
import { useContractWrite } from 'wagmi'
import nftProjectAbi from '../../contract_abi/NFT_project_abi.json'



const MintButton = () => {

    const navigate = useNavigate();
    const contractAddress = '0x87f89914b59A58E33996D843B18B7e914cC86d4c'; // get from buid(projectForm) or get from old


    // 使用 usePrepareContractWrite 定義 Mint 函式
    const { write: Mint, status: MintStatus } = useContractWrite({
        address: contractAddress,
        abi: nftProjectAbi,
        functionName: 'Mint',
        })
    
        // 使用 usePrepareContractWrite 定義 Open 函式
        const { write: setAllBlindOpen, status: setAllBlindOpenStatus } = useContractWrite({
        address: contractAddress,
        abi: nftProjectAbi,
        functionName: 'setAllBlindOpen',
        })

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = e.target.Mintaddress.value;
        // 分割地址
        const splitaddress = formData.split(',');
        const amount = splitaddress.length;
        // 執行mint
        try {
            await Mint(amount);
            navigate('/FinalPage')
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpen = async () => {
        console.log(setAllBlindOpen);
        try {
            await setAllBlindOpen();
            navigate('/FinalPage')
        } catch (error) {
            console.error(error);
        }
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