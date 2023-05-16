import './metamaskblock.css'
import { useDispatch, useSelector } from 'react-redux'
import { get_account, select_account } from '../../States/accounts/accountSlice'
import store from '../../States/stores'
import { useState } from 'react'
import { useConnect, useAccount } from 'wagmi'



const MetamaskBlock = () => {
  // const account = useSelector(state => state.account)
  const [connectedToMetamask, setConnectedToMetamask] = useState(false);
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { address, isConnecting, isDisconnected } = useAccount()
 
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