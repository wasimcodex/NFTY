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
} from 'react-bootstrap'
import imagePlaceholder from '../assets/image-placeholder.png'
import {useParams} from 'react-router-dom'
import {exchangeRate} from '../utils/bankFunctions';
import {createAuction} from '../utils/auctionFunctions';
import {approveNft} from '../utils/nftApprove';
const {address} = require('../artifacts/auction.json')

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
  return data
}

function SellNFT({ wallet }) {
  let { contractAddress, tokenId } = useParams()
  const [NFT, setNFT] = useState({})
  const [exhRate, setExhRate] = useState(0)
  const [inputETH, setInputETH] = useState(0)
  const [buyNowPrice, setBuyNowPrice] = useState(0)
  const [auctionEndDate, setAuctionEndDate] = useState(0)
  const [response, setResponse] = useState(null)
  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      // console.log(nft)
      setNFT(nft)
    }
    getNft()
  }, [])

  const handleInputINR = async(e) => {
    const rate = await exchangeRate()
    setExhRate(rate)
    setInputETH((e.target.value / exhRate).toFixed(8))
  }

  const handleInputBuyNowPrice = async(e) => {
    const rate = await exchangeRate()
    setExhRate(rate)
    setBuyNowPrice((e.target.value / exhRate).toFixed(8))
  }
  const auctionCreate = async() => {
    const inputEthString = inputETH.toString()
    const buyNowPriceString = buyNowPrice.toString()
    const auctionEndDateString = auctionEndDate.toString()
    console.log(contractAddress, tokenId, inputEthString, buyNowPriceString, auctionEndDateString)
    // const approveAuction = await approveNft(address, tokenId);
    // console.log(approveAuction.status)
    const completeListing = await createAuction(contractAddress, tokenId, inputEthString, buyNowPriceString, auctionEndDate)
    setResponse(completeListing.status)
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg={6} sm={12}>
            <h1 className='heading'>List Item for Auction</h1>
            <div className='sellOptions'>
              <p className='text'>Price</p>
              <div classsName='options'>
                  <InputGroup>
                    <FormControl
                      placeholder="Enter Amount in INR"
                      type="number"
                      onChange={handleInputINR}
                    />
                    <InputGroup.Text>INR</InputGroup.Text>
                  </InputGroup>
                  <InputGroup>
                    <FormControl
                      placeholder="ETH Equivalent"
                      type="number"
                      value={inputETH > 0 ? inputETH : ''}
                      readOnly
                    />
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup>
              </div>
            </div>
            <div className='sellOptions'>
              <p className='text'>Duration</p>
              <div classsName='options'>
                <Row>
                  <Col>
                    <Form.Label size="lg">End Date</Form.Label>
                    <Form.Control size="lg" type="date" onChange={e => setAuctionEndDate(e.target.value)}/>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='sellOptions'>
            <p className='text'>Add Buy Now Price</p>
              <div classsName='options'>
              <InputGroup>
                    <FormControl
                      placeholder="Enter Amount in INR"
                      type="number"
                      onChange={handleInputBuyNowPrice}
                    />
                    <InputGroup.Text>INR</InputGroup.Text>
                  </InputGroup>
                  <InputGroup>
                    <FormControl
                      placeholder="ETH Equivalent"
                      type="number"
                      value={buyNowPrice > 0 ? buyNowPrice : ''}
                      readOnly
                    />
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup>
              </div>
            </div>
            <div className='sellOptions'>
              <p className='text'>Fees</p>
              <div classsName='options'>
                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <span>Service Fee</span>
                  <span>2.5%</span>
                </div>   
              </div>
            </div>
            <div className='sellOptions'>
              <div className="mb-2">
                <Button variant="primary" size="lg" onClick={auctionCreate}>Complete Listing</Button>
              </div>
            </div>
          </Col>
          <Col lg={2} sm={0}></Col>
          <Col lg={4} sm={12}>
            <div className='sideHeading'>Preview</div>
            <div className="sellOptions">
              <div>
                <Card>
                  <Card.Img variant="bottom" src={NFT.image_url} />
                  <Card.Body>
                    <div style={{display: 'flex',justifyContent: 'space-between'}}>
                      <Card.Subtitle className="mb-2 text-muted">Collection name</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                    </div>
                    <div style={{display: 'flex',justifyContent: 'space-between'}}>
                      <Card.Title>{NFT.name}</Card.Title>
                      <Card.Title>0 ETH</Card.Title>
                    </div>        
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
        {response && (
              <Container>
                <Row className="justify-content-center">
                  <Col md="6">
                    <Alert variant="info">{response}</Alert>
                  </Col>
                </Row>
              </Container>
        )}
      </Container>
    </div>);
}

export default SellNFT;
