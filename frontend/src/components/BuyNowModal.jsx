import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import { bidAuction, getAuction } from '../utils/auctionFunctions'
import { useParams } from 'react-router-dom'
import { exchangeRate, nftAuction } from '../utils/bankFunctions';
import { approveNft } from '../utils/nftApprove'

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
function BuyNowModal(props) {
  let { contractAddress, tokenId } = useParams()
  const [inputETH, setInputETH] = useState(0)
  const [NFT, setNFT] = useState({})
  const [auction, setAuction] = useState({})

  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      const actionDetails = await getAuction(contractAddress, tokenId)
      console.log(actionDetails)
      setAuction(actionDetails)
      // console.log(nft)
      setNFT(nft)
    }
    getNft()
  }, [])

  const buyNow = async () => {
    const nftAddress = contractAddress
    const id = tokenId
    const bidAmount = (auction.buyNowPrice / 1000000000000000000).toString()
    const bidNow = await bidAuction(nftAddress, id, bidAmount)
    alert(bidNow.status)
    props.onHide()
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buy Now
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>The Buy Now Price for the NFT is {auction.buyNowPrice / 1000000000000000000} ETH.</h6>
        <h6>Are you sure, you want to buy the NFT?</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={buyNow}>Confirm</Button>
        <Button variant="danger" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BuyNowModal