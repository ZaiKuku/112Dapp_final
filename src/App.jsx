import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';
import Startpage from './pages/Startpage'
import SettingPage from './pages/SettingPage'

import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom'

const Layout = (props) => {
  return (
    <>
      <nav>
        <Link to="/">主頁</Link>
        <Link to="/MintSetting" style={{ marginLeft: "20px" }}>MintSetting</Link>
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
        </Routes>
        </Layout>
      </Router>
    </div>

  )
}


export default App