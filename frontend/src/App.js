import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react'

import CreateNft from './components/CreateNft'
import Explore from './components/Explore'
import CustomNav from './components/Nav'
import BankInfo from './components/BankInfo'
import ConnectBtn from './components/ConnectBtn'
import NFTDescription from './components/NFTDescription'
import Transfer from './components/Transfer'
import SellNFT from './components/SellNFT'
import Profile from './components/Profile'
import ApplyLoan from './components/ApplyLoan'
import LoanDetails from './components/LoanDetails'

function App() {
  const [status, setStatus] = useState('')
  const [connected, setConnected] = useState()
  const [wallet, setWallet] = useState()
  return (
    <div>
      <Router>
        <CustomNav
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
        <Route path="/nft/:contractAddress/:tokenId/" exact>
          <NFTDescription wallet={wallet} />
        </Route>
        <Route path="/nft/transfer/:contractAddress/:tokenId/" exact>
          <Transfer />
        </Route>
        <Route path="/nft/:contractAddress/:tokenId/sell">
          <SellNFT />
        </Route>
        <Route path="/profile">
          <Profile wallet={wallet}/>
        </Route>
        <Route path="/applyloan">
          <ApplyLoan wallet={wallet} />
        </Route>
        <Route path="/loandetails">
          <LoanDetails />
        </Route>
      </Router>
    </div>
  )
}

export default App
