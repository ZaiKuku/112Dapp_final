import './App.css'
import React ,{ useState, useEffect } from 'react'
import Startpage from './pages/Startpage'
import SettingPage from './pages/SettingPage'
import MintPage from './pages/MintPage'
import FinalPage from './pages/FinalPage'

import { createConfig, configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'
import { connect, InjectedConnector } from '@wagmi/core';

import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom'


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()],
)
 
export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

const Layout = (props) => {
  return (
    <>
      <nav>
        <Link to="/">主頁</Link>
        <Link to="/MintSetting" style={{ marginLeft: "20px" }}>MintSetting</Link>
        <Link to="/Mint" style={{ marginLeft: "20px" }}>Mint</Link>
        <Link to="/FinalPage" style={{ marginLeft: "20px" }}>FinalPage</Link>
      </nav>
      {props.children}
    </>
  )
}

function App() {
  const [web3Provider, setWeb3Provider] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const connector = new InjectedConnector();
        await connector.isAuthorized();
        const provider = connector.getProvider();
        setWeb3Provider(provider);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  if (!web3Provider) {
    return <div>Loading...</div>;
  }

  return (
      <WagmiConfig config={config}>
        <Router>
          <Layout>
          <Routes>
              <Route path="/" element={<Startpage/>} />
              <Route path="/MintSetting" element={<SettingPage/>} />
              <Route path="/Mint" element={<MintPage/>} />
              <Route path="/FinalPage" element={<FinalPage/>} />
              
          </Routes>
          </Layout>
        </Router>
      </WagmiConfig>

  )
}

export default App;