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
import { bidAuction } from '../utils/auctionFunctions'
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
  const [inputETH, setInputETH] = useState(0)
  const [NFT, setNFT] = useState({})

  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      const rate = await exchangeRate()
      // console.log(nft)
      setNFT(nft)
      setExhRate(rate)
    }
    getNft()
  }, [])


  const placeBid = async () => {
    const nftAddress = contractAddress
    const id = tokenId
    const bidAmount = inputETH.toString()
    const response = await bidAuction(nftAddress, id, bidAmount)
    alert(response.status)
  }

  const handleInputINR = async (e) => {
    setInputETH((e.target.value / exhRate).toFixed(8))
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
                    placeholder="Amount in INR"
                    type="number"
                    onChange={handleInputINR}
                  />
                  <InputGroup.Text>INR</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <FormControl
                    placeholder="Amount in ETH"
                    type="number"
                    value={inputETH > 0 ? inputETH : ''}
                    readOnly
                  />
                  <InputGroup.Text>ETH</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={placeBid}>Confirm</Button>
        <Button variant="danger" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PlaceBidModal