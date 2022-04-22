import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  FormControl,
  InputGroup,
  Col,
  Form,
  Row,
} from 'react-bootstrap'
import { bidAuction, getAuction } from '../utils/auctionFunctions'
import { useParams } from 'react-router-dom'
import { exchangeRate } from '../utils/bankFunctions';


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

function PlaceBidModal(props) {
  let { contractAddress, tokenId } = useParams()
  const [exhRate, setExhRate] = useState(0)
  const [inputINR, setInputINR] = useState(0)
  const [bidETH, setBidETH] = useState(0)
  const [NFT, setNFT] = useState({})
  const [auction, setAuction] = useState({})
  const [response, setResponse] = useState(false)

  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      const rate = await exchangeRate()
      const actionDetails = await getAuction(contractAddress, tokenId)
      // console.log(nft)
      setNFT(nft)
      setExhRate(rate)
      setAuction(actionDetails)
    }
    getNft()
  }, [])

  const handleBid = async () => {
    if (bidETH < auction.minPrice/1e18) {
      // console.log(bidETH)
      // console.log(auction.minPrice/1e18)
      setResponse(true)
    } else {
      placeBid()
      props.onHide()
    }
  }

  const placeBid = async () => {
    const nftAddress = contractAddress
    const id = tokenId
    const bidAmount = bidETH.toString()
    const response = await bidAuction(nftAddress, id, bidAmount)
    alert(response.status)
  }

  const handleInputETH = async (e) => {
    setBidETH(e.target.value)
    console.log(bidETH)
    setInputINR((e.target.value * exhRate).toFixed(8))
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Place Bid
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="emi_amount">
            <Row>
              <Col>
                <Form.Label>
                  Enter your bid amount
                </Form.Label>
              </Col>
              <Col>
                <InputGroup>
                  <FormControl
                    placeholder="Amount in ETH"
                    type="number"
                    onChange={handleInputETH}
                  />
                  <InputGroup.Text>ETH</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <FormControl
                    placeholder="Amount in INR"
                    type="number"
                    value={inputINR > 0 ? inputINR : ''}
                    readOnly     
                  />
                  <InputGroup.Text>INR</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            {response && (
                <p style={{color: 'red', marginTop: '2%'}}>
                  Bid amount should be greater than or equal to {auction.minPrice / 1e18} ETH.
                </p>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleBid}>Confirm</Button>
        <Button variant="danger" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PlaceBidModal