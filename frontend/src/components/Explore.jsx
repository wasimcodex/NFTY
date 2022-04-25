/**
 * NFT Collections page component
 */

import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import NftCards from './NftCards'

const axios = require('axios')

const { address } = require('../artifacts/nft-contract.json')
const auction = require('../artifacts/auction.json')
const auctionAddress = auction.address
const auctionAbi = auction.abi

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

// Get all AuctionEnd events
const getAuctionEndEvents = async () => {
  window.contract = await new web3.eth.Contract(auctionAbi, auctionAddress)
  const allEvents = await window.contract.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest',
  })
  var events = []
  const auctionEndEvents = allEvents.filter((event) => {
    return event.event === 'AuctionEnded'
  })
  auctionEndEvents.forEach((event) => {
    events.push(event)
  })
  return events
}

//Gets NFT collections details (id, name, description, owner)
const getNFTs = async (owner) => {
  const data = await axios
    .get(
      `https://testnets-api.opensea.io/api/v1/assets?asset_contract_addresses=${address}&order_direction=desc&offset=0&limit=20`,
    )
    .then((res) => {
      if (!owner) {
        return res.data.assets
      } else {
        return res.data.assets.filter((nft) => nft.owner.address === owner)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  return data
}

const mapPriceToNft = async (nfts, auctionEndEvents) => {
  for (let i = 0; i < nfts.length; i++) {
    for (let j = 0; j < auctionEndEvents.length; j++) {
      if (nfts[i].token_id === auctionEndEvents[j].returnValues.auctionId) {
        nfts[i].price = auctionEndEvents[j].returnValues.highestBid
      }
    }
  }
  return nfts
}

export default function Explore({ owner, selectNFT }) {
  const [NFTs, setNFTs] = useState([])
  useEffect(() => {
    async function getNfts() {
      const nfts = await getNFTs(owner)
      const auctionEndEvents = await getAuctionEndEvents()
      console.log(auctionEndEvents)
      const nftsWithPrice = await mapPriceToNft(nfts, auctionEndEvents)
      setNFTs(nftsWithPrice)
      console.log(nftsWithPrice)
    }
    getNfts()
  }, [owner])

  const [Status, setStatus] = useState('')
  return (
    <div>
      <Container>
        <div style={{ padding: '20px' }}>
          <Row xs={1} md={3} className="g-4">
            {NFTs.map((nft, index) => (
              <Col key={index}>
                <NftCards nft={nft} selectNFT={selectNFT} key={index} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  )
}
