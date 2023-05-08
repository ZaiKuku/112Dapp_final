import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Startpage from './pages/Startpage'
import SettingPage from './pages/SettingPage'
import MintPage from './pages/MintPage'

import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom'

const Layout = (props) => {
  return (
    <>
      <nav>
        <Link to="/">主頁</Link>
        <Link to="/MintSetting" style={{ marginLeft: "20px" }}>MintSetting</Link>
        <Link to="/Mint" style={{ marginLeft: "20px" }}>Mint</Link>
      </nav>
      {props.children}
    </>
  )
}

function App() {

  return (
    <div>
      <Router>
        <Layout>
        <Routes>
            <Route path="/" element={<Startpage/>} />
            <Route path="/MintSetting" element={<SettingPage/>} />
            <Route path="/Mint" element={<MintPage/>} />
        </Routes>
        </Layout>
      </Router>
    </div>

  )
}


export default App