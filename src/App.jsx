import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const handleGetAddress = async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    res && Array.isArray(res) && console.log(accounts[0]);
  }

}

function App() {

  return (
    <body>
      <span class="e2_3">NFT CRAFTOR</span>
      <button onClick={handleGetAddress} class="e2_5"></button>
    </body >)
}

export default App