import { useState, useEffect } from 'react'
import { Button, Image } from 'react-bootstrap'

import { connectWallet, getWalletStatus } from '../utils/walletFunctions'

import connectedArt from '../assets/connected-art.jpg'
import notConnetedArt from '../assets/not-connected.png'

export const ConnectBtn = ({ setStatus, setConnected, setWallet }) => {
  const [walletAddress, setWalletAddress] = useState('')

  const handleConnect = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setConnected(walletResponse.connected)
    setWalletAddress(walletResponse.address)
    setWallet(walletResponse.address)
  }

  useEffect(() => {
    const checkWalletStatus = async () => {
      const walletResponse = await getWalletStatus()
      setStatus(walletResponse.status)
      setConnected(walletResponse.connected)
      setWalletAddress(walletResponse.address)
      setWallet(walletResponse.address)
    }

    const walletListener = () => {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
          checkWalletStatus()
        })
      }
    }

    checkWalletStatus()
    walletListener()
  }, [setConnected, setStatus, setWallet])

  return (
    <Image
      src={walletAddress.length === 0 ? notConnetedArt : connectedArt}
      roundedCircle
      style={{
        border: '1px solid',
        borderColor: 'white',
        backgroundColor: 'white',
        height: '25px',
        width: '25px',
      }}
    />
  )
}

export default ConnectBtn
