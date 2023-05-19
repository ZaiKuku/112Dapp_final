import './App.css'
import React ,{ useState, useEffect } from 'react'
import Startpage from './pages/Startpage'
import SettingPage from './pages/SettingPage'
import MintPage from './pages/MintPage'
import FinalPage from './pages/FinalPage'

import { createConfig, configureChains, WagmiConfig, useConnect } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'

import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom'


const { chains, publicClient} = configureChains(
  [goerli],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
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

  return (
      <WagmiConfig config={config}>
        <Router>
 
          <Routes>
              <Route path="/" element={<Startpage/>} />
              <Route path="/MintSetting" element={<SettingPage/>} />
              <Route path="/Mint" element={<MintPage/>} />
              <Route path="/FinalPage" element={<FinalPage/>} />
              
          </Routes>
 
        </Router>
      </WagmiConfig>

  )
}

export default App;