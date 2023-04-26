import './metamaskblock.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_account, select_account } from '../accounts/accountSlice'
import { useState } from 'react'


const MetamaskBlock = () => {
    // const account = useSelector(state => state.account)
    const [connectedToMetamask, setConnectedToMetamask] = useState(false);
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

    const connectToMetamask = async () => {
        if (window.ethereum) { // check if Metamask is installed
          try {
            await window.ethereum.request({ method: 'eth_accounts' }); // check if Metamask is connected to a network
            setConnectedToMetamask(true); // set connectedToMetamask state to true
            handleGetAddress;
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('Metamask is not installed');
        }
      };


    // return (
    //     <button onClick={connectToMetamask} className="e2_5"></button>
    // )
    return (
        <div>
          {!connectedToMetamask && <button onClick={connectToMetamask} className="METAMASK"></button>}
          {connectedToMetamask && <font color="white"> Upload your NFT </font> }
        </div>
    );
}

export default MetamaskBlock