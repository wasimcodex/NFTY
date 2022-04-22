import React from 'react'
import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Container,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { transferNft } from '../utils/nftFunctions'
import imgplaceholder from '../assets/image-placeholder.png'


const axios = require('axios');

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
  //console.log(data)
  return data
}

const Transfer = () => {
  let { contractAddress, tokenId } = useParams()
  const [NFT, setNFT] = useState({})
  const [recipient, setRecipient] = useState(null)

  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      // console.log(nft)
      setNFT(nft)
    }
    getNft()
  }, [])

  const transfer = async () => {
    const toAddress = recipient
    const response = await transferNft(toAddress, tokenId)
    alert(response.status)
  }
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Transfer</h2>
      <img
        style={{ alignContent: 'center', margin: 'auto', display: 'block' }}
        className="cardImg"
        src={imgplaceholder}
        alt="placeholder"
      />
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <InputGroup className="address-input">
              <FormControl
                placeholder="Enter Beneficiary Address Eg. 0x1234567..."
                type="text"
                onChange={e => setRecipient(e.target.value)}
              />
              <InputGroup.Text>Address</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Button
          className="action-btn"
          variant="info"
          style={{ alignContent: 'center', margin: 'auto', display: 'block' }}
          onClick={transfer}
        >
          Transfer
        </Button>
      </Container>
    </div>
  )
}

export default Transfer
