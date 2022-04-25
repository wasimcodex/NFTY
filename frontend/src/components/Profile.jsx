import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import {
  Container,
  Image,
  Tabs,
  Tab,
  Table
} from 'react-bootstrap';
import eth from '../assets/eth.svg'
import moment from 'moment'
import { connectWallet, getWalletStatus } from '../utils/walletFunctions'
import { getAllNftTransactionHistory } from '../utils/nftFunctions'
import connectedArt from '../assets/connected-art.jpg'
import notConnetedArt from '../assets/not-connected.png'
import Explore from './Explore';

const axios = require('axios')

const getNftData = async (contractAddress, tokenId) => {
  const data = await axios
    .get(
      `https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`,
    )
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return data
}

const getTnxs = async (contractAddress, tokenId) => {
  const data = await getAllNftTransactionHistory(contractAddress, tokenId)
  return data
}

function Profile({ wallet }) {
  const [key, setKey] = useState('nfts');
  let { contractAddress, tokenId } = useParams()
  const [NFT, setNFT] = useState({})
  const [txnHistory, setTxnHistory] = useState([])
  var dummyAddress = window.ethereum.selectedAddress
  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      const txnHistory = await getTnxs(contractAddress, tokenId)
      setNFT(nft)
      console.log(nft)
      setTxnHistory(txnHistory)
      console.log(txnHistory)
    }
    getNft()
  }, [])

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
                  <Explore owner={wallet} />
                </div>
              </Tab>
              <Tab eventKey="activity" title="NFT Activity" style={{ borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', borderLeft: '1px solid #dee2e6'}}>
                <div style={{ padding: '10px'}}>
                  <Table responsive borderless>
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Item ID</th>
                        <th>Price</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                      </tr>                    
                    </thead>
                    <tbody style={{ borderTop: '1px solid #dee2e6' }}>
                      {txnHistory &&
                          txnHistory.map((txn, i) => (
                            <tr key={i}>
                              <td>{txn.from == 0 ? 'Minted' : 'Transfer'}</td>
                              <td>{txn.tokenId}</td>
                              <td>0.01</td>
                              <td>{txn.from.substring(2, 7).toUpperCase()}</td>
                              <td>{txn.to.substring(2, 7).toUpperCase()}</td>
                              <td>{moment(txn.timeStamp * 1000).fromNow()}</td>
                            </tr>
                          ))}
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
