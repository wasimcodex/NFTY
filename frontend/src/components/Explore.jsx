/**
 * NFT Collections page component
 */

import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import NftCards from './NftCards'

const axios = require('axios')

const { address } = require('../artifacts/nft-contract.json')

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

export default function Explore({ owner, selectNFT }) {
  const [NFTs, setNFTs] = useState([])
  useEffect(() => {
    async function getNfts() {
      const nfts = await getNFTs(owner)
      setNFTs(nfts)
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
