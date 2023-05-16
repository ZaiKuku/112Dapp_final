import './metamaskblock.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_account, select_account } from '../../States/accounts/accountSlice'
import store from '../../States/stores'
import { useState } from 'react'
import { useConnect, useAccount } from 'wagmi'



const MetamaskBlock = () => {
  // const account = useSelector(state => state.account)
  const [connectedToMetamask, setConnectedToMetamask] = useState(false);
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { address, isConnecting, isDisconnected } = useAccount()
  // const dispatch = useDispatch()

  // const [address, setAddress] = useState('')
  
  

  // const connectToMetamask = async () => {

  //   if (window.ethereum) { // check if Metamask is installed
  //     try {
  //       if (typeof window.ethereum !== "undefined") {
  //         const loaded_account = await window.ethereum.request({
  //           method: "eth_requestAccounts",
  //         });

  //         const sendData = {
  //           account: loaded_account[0]
  //         }


  //         console.log(loaded_account);

  //         dispatch(get_account(sendData))
  //       }
  //       setConnectedToMetamask(true); // set connectedToMetamask state to true


  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     console.log('Metamask is not installed');
  //   }
  //   setAddress(store.getState().account.account)
  //   console.log(address)
  // };

  // return (
  //   <div>
  //     {!connectedToMetamask && <button onClick={connectToMetamask} className="METAMASK"></button>}
  //     {connectedToMetamask && <div className='address'>{address.slice(0, 5)}...{address.slice(address.length-5, address.length-1)}</div>}
  //   </div>
  // );
  return (
    <div>
      {isConnecting && connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          className="METAMASK"
        >
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}

        </button>
      ))}
      {!isConnecting && <div className='address'>{address.slice(0, 5)}...{address.slice(address.length-5, address.length-1)}</div>}
      {error && <div>{error.message}</div>}
    </div>
  )
}

export default MetamaskBlock