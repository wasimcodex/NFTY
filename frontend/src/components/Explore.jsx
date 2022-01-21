/**
 * NFT Collections page component
 */

import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import NftCards from './NftCards'

const axios = require('axios')

const { nftAddress } = require('../contracts/nft-contract-address.json')

//Gets NFT collections details (id, name, description, owner)
const getNFTs = async () => {
  const data = await axios
    .get(
      `https://testnets-api.opensea.io/api/v1/assets?asset_contract_addresses=${nftAddress}&order_direction=desc&offset=0&limit=20`,
    )
    .then((res) => {
      return res.data.assets
    })
    .catch((err) => {
      console.log(err)
    })
  return data
}

export default function Explore() {
  const [NFTs, setNFTs] = useState([])
  useEffect(() => {
    async function getNfts() {
      const nfts = await getNFTs()
      setNFTs(nfts)
    }
    getNfts()
  }, [])

  const [Status, setStatus] = useState('')
  return (
    <div>
      <div style={{ padding: '20px' }}>
        <Row xs={1} md={3} className="g-4">
          {NFTs.map((nft, index) => (
            <Col key={index}>
              <NftCards nft={nft} key={index} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
