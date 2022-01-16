import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react'

import CreateNft from './components/CreateNft'
import Explore from './components/Explore'
import CustomNav from './components/Nav'
import BankInfo from './components/BankInfo'
import ConnectBtn from './components/ConnectBtn'

function App() {
  const [status, setStatus] = useState('')
  const [connected, setConnected] = useState()
  const [wallet, setWallet] = useState()
  return (
    <div>
      <Router>
        <CustomNav />
        <ConnectBtn
          setStatus={setStatus}
          setConnected={setConnected}
          setWallet={setWallet}
        />
        <Route path="/" exact>
          <CreateNft />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/bank">
          <BankInfo onAccoutChange={wallet} />
        </Route>
      </Router>
    </div>
  )
}

export default App
