import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './MintButton.css'
import { usePrepareContractWrite, useAccount } from 'wagmi'


const MintButton = () => {
    const navigate = useNavigate();

    //確認錢包連接
    const { address, isConnecting, isDisconnected } = useAccount()
    if (isConnecting) return <div>Connecting…</div>
    if (isDisconnected) return <div>Disconnected</div>

    // 使用 usePrepareContractWrite 定義 Mint 函式
    const { write: Mint, status: MintStatus } = usePrepareContractWrite({
        account: '0xcbe74E481Cc76C949207295235b7dCD6455AFf14',
        abi: wagmigotchiABI,
        functionName: 'Mint',
        })
    
        // 使用 usePrepareContractWrite 定義 Open 函式
        const { write: setAllBlindOpen, status: setAllBlindOpenStatus } = usePrepareContractWrite({
        account: '0xcbe74E481Cc76C949207295235b7dCD6455AFf14',
        abi: wagmigotchiABI,
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
    }

    return (
        <div>
            {address && <div>Address: {address}</div>}
            {isConnecting && <div>Connecting…</div>}
            {isDisconnected && <div>Disconnected</div>}
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

export default MintButton;