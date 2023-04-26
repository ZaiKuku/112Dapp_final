import './metamaskblock.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_account, select_account } from '../accounts/accountSlice'


const MetamaskBlock = () => {
    // const account = useSelector(state => state.account)
    const account = useSelector(select_account)
    const dispatch = useDispatch()

    const handleGetAddress = async () => {
        if (typeof window.ethereum !== "undefined") {
            const loaded_account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            
            const sendData = {
                account: loaded_account[0]
            }
            dispatch(get_account(sendData))
            

        }

    }


    return (
        <button onClick={handleGetAddress} className="e2_5"></button>
    )
}

export default MetamaskBlock