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
  Image,
  Tabs,
  Tab,
  Table
} from 'react-bootstrap';
import eth from '../assets/eth.svg'
import { connectWallet, getWalletStatus } from '../utils/walletFunctions'
import connectedArt from '../assets/connected-art.jpg'
import notConnetedArt from '../assets/not-connected.png'
import Explore from './Explore';
  
function Profile({ setStatus, setConnected, setWallet }) {
  const [key, setKey] = useState('nfts');
  var dummyAddress = '0x02ffdde0e9ad2999fd222c487410fd79aca8a8dd'
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
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.125%'}}>
            <div style={{ fontSize: '30px', fontWeight: '600'}}>Unnamed</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='addrContainer'>
              <img style={{ height: '20px', marginLeft: '10px', marginRight: '10px'}} src={eth} />
              <div className='addrText' style={{ marginRight: '10px'}}>{dummyAddress.slice(0,6)}...{dummyAddress.slice(38)}</div>
            </div>
          </div>
        </div> 
        <div style={{ marginTop: '2%' }}>
          <Tabs
            justify
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
              <Tab eventKey="nfts" title="My NFTs">
                <div style={{ borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', borderLeft: '1px solid #dee2e6'}}>
                  <Explore />
                </div>
              </Tab>
              <Tab eventKey="activity" title="NFT Activity" style={{ borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', borderLeft: '1px solid #dee2e6'}}>
                <div style={{ padding: '10px'}}>
                  <Table responsive borderless>
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                      </tr>                    
                    </thead>
                    <tbody style={{ borderTop: '1px solid #dee2e6' }}>
                      <tr>
                        <td>Minted</td>
                        <td>NFT 1</td>
                        <td>---</td>
                        <td>Me</td>
                        <td>NA</td>
                        <td>Today</td>
                      </tr>
                    </tbody>
                  </Table>                
                </div>
              </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}

export default Profile;
