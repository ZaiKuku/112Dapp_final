import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './States/stores'
import { Provider } from 'react-redux'
import { WagmiConfig,createConfig,configureChains, mainnet, sepolia} from "wagmi";
import {publicProvider} from "wagmi/providers/public"

const { publicClient } = configureChains([sepolia], [publicProvider()])
 
const config = createConfig({
  autoConnect: true,
  publicClient,
})


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <WagmiConfig config={config}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>

  </React.StrictMode>,
)

