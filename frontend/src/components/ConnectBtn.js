import React, { useState, useEffect } from 'react'
import { connectWallet, getCurrentWalletConnected } from '../utils/connetWallet'

export default function ConnectBtn({ setStatus }) {
  const [walletAddress, setwalletAddress] = useState('')

  const connetWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setwalletAddress(walletResponse.address)
  }

  useEffect(() => {
    async function getWalletStatus() {
      const { address, status } = await getCurrentWalletConnected()
      setwalletAddress(address)
      setStatus(status)
    }
    getWalletStatus()
    walletListener()
  }, [])

  const walletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setwalletAddress(accounts[0])
          setStatus('')
        } else {
          setwalletAddress('')
          setStatus('')
        }
      })
    } else {
      setwalletAddress('')
      setStatus('You must install Metamask, in your browser.')
    }
  }

  return (
    <div>
      <div className="text-center connect-btn">
        <button id="walletButton" onClick={connetWalletPressed}>
          {walletAddress.length > 0 ? (
            'Connected: ' +
            String(walletAddress).substring(0, 6) +
            '...' +
            String(walletAddress).substring(38)
          ) : (
            <span>connect Wallet</span>
          )}
        </button>
      </div>
    </div>
  )
}
