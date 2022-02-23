import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Col,
  Form,
  Card,
  Row,
  Alert,
  Image
} from 'react-bootstrap';

import { connectWallet, getWalletStatus } from '../utils/walletFunctions'
import connectedArt from '../assets/connected-art.jpg'
import notConnetedArt from '../assets/not-connected.png'
  
function Profile({ setStatus, setConnected, setWallet }) {
  // const [walletAddress, setWalletAddress] = useState('')

  // const handleConnect = async () => {
  //   const walletResponse = await connectWallet()
  //   setStatus(walletResponse.status)
  //   setConnected(walletResponse.connected)
  //   setWalletAddress(walletResponse.address)
  //   setWallet(walletResponse.address)
  // }

  // useEffect(() => {
  //   const checkWalletStatus = async () => {
  //     const walletResponse = await getWalletStatus()
  //     setStatus(walletResponse.status)
  //     setConnected(walletResponse.connected)
  //     setWalletAddress(walletResponse.address)
  //     setWallet(walletResponse.address)
  //   }

  //   const walletListener = () => {
  //     if (window.ethereum) {
  //       window.ethereum.on('accountsChanged', (accounts) => {
  //         checkWalletStatus()
  //       })
  //     }
  //   }

  //   checkWalletStatus()
  //   walletListener()
  // }, [setConnected, setStatus, setWallet])

  return (
    <div>
      <Container>
        <div id='profileHeader' style={{ display: 'flex', justifyContent: 'center'}}>
          <Image src={connectedArt}
            roundedCircle
            style={{
              marginTop: '2%',
              border: '1px solid',
              borderColor: 'white',
              backgroundColor: 'white',
              height: '100px',
              width: '100px'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <div className='nameHeader'>
            <div className='priceAmount' style={{ fontSize: '30px', fontWeight: '600'}}>Unnamed</div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Profile;
