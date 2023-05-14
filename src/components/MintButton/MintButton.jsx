import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './MintButton.css'
import { usePrepareContractWrite } from 'wagmi'
import nftProjectAbi from '../abi/NFT_project_abi.json';


const MintButton = () => {

    const navigate = useNavigate();
    const etherscanApiKey = 'JDQ2V2CCJW51SPZMZ7M81GC6A3EF4R1EGG';
    const contractAddress = '0x87f89914b59A58E33996D843B18B7e914cC86d4c'; // get from buid(projectForm) or get from old

    const [abi, setAbi] = useState(null);
    setAbi(nftProjectAbi);

    // 使用 usePrepareContractWrite 定義 Mint 函式
    const { write: Mint, status: MintStatus } = usePrepareContractWrite({
        account: contractAddress,
        abi: abi,
        functionName: 'Mint',
        })
    
        // 使用 usePrepareContractWrite 定義 Open 函式
        const { write: setAllBlindOpen, status: setAllBlindOpenStatus } = usePrepareContractWrite({
        account: contractAddress,
        abi: abi,
        functionName: 'setAllBlindOpen',
        })

    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = e.target.value;
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
        navigate('/FinalPage')
    }

    const handleOpen = async () => {
        try {
            await setAllBlindOpen();
            navigate('/FinalPage')
        } catch (error) {
            console.error(error);
        }
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