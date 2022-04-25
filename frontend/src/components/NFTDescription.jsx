import React from 'react'
// import div from 'react-bootstrap/div'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import eth from '../assets/eth.svg'

import moment from 'moment'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getNftTransactionHistory } from '../utils/nftFunctions'

import { auctionCancel, getAuction, getAuctionBids, takeHighestBid, withdrawAuctionBid } from '../utils/auctionFunctions'

import {
  FaAlignJustify,
  FaAlignLeft,
  FaAngleDown,
  FaAngleUp,
  FaChartLine,
  FaClock,
  FaExchangeAlt,
  FaGift,
  FaInfoCircle,
  FaTag,
} from 'react-icons/fa'

import noChartData from '../assets/no-chart-data.svg'
import emptyAsks from '../assets/empty-asks.svg'
import emptyBids from '../assets/empty-bids.svg'
import PlaceBidModal from './PlaceBidModal'
import BuyNowModal from './BuyNowModal'
import { exchangeRate } from '../utils/bankFunctions'

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
  const data = await getNftTransactionHistory(contractAddress, tokenId)
  return data
}

const getBids = async (contractAddress, tokenId) => {
  const data = await getAuctionBids(contractAddress, tokenId)
  const id = tokenId
  const auctionBids = []
  for (let i = 0; i < data.length; i++) {
    if (id == data[i].returnValues.auctionId) {
      auctionBids.push(data[i])
    }
  }
  return auctionBids
}

function NFTDescription({ wallet }) {
  let { contractAddress, tokenId } = useParams()
  const [NFT, setNFT] = useState({})
  const [showPriceHistory, setPriceHistor] = useState(true)
  const [showListing, setListing] = useState(false)
  const [showOffers, setOffers] = useState(false)
  const [showDetails, setDetails] = useState(false)
  const [txnHistory, setTxnHistory] = useState([])
  const [bids, setBids] = useState([])
  const [auction, setAuction] = useState({})
  const [modalShow, setModalShow] = useState(false)
  const [buyNowModalShow, setBuyNowModalShow] = useState(false)
  const [exhRate, setExhRate] = useState(0)
  const [minPriceINR, setMinPriceINR] = useState(0)
  const [highestBidINR, setHighestBidINR] = useState(0)
  const [buyNowINR, setBuyNowINR] = useState(0)

  useEffect(() => {
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      const txnHistory = await getTnxs(contractAddress, tokenId)
      setNFT(nft)
      console.log(nft)
      setTxnHistory(txnHistory)
      console.log(txnHistory)
      const bidHistory = await getBids(contractAddress, tokenId)
      setBids(bidHistory)
      console.log(bidHistory)
      const actionDetails = await getAuction(contractAddress, tokenId)
      console.log(actionDetails)
      setAuction(actionDetails)
      const rate = await exchangeRate()
      setExhRate(rate)
    }
    getNft().then(() => {
      setBuyNowINR(((auction.buyNowPrice / 1000000000000000000) / exhRate))
      setMinPriceINR(((auction.minPrice / 1000000000000000000) / exhRate))
      setHighestBidINR(((auction.highestBid / 1000000000000000000) / exhRate))
    })
  }, [])

  const withdrawAuction = async () => {
    const nftAddress = contractAddress
    const id = tokenId
    const result = await auctionCancel(nftAddress, id)
    alert(result.status)
  }

  const acceptHighestBid = async() => {
    const nftAddress = contractAddress
    const id = tokenId
    const result = await takeHighestBid(nftAddress, id)
    alert(result.status)
  }

  return (
    <div style={{ paddingTop: '10px' }}>
      <Container>
        {NFT.owner && NFT.owner.address === wallet && (
          <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
            <span style={{ marginRight: '20px' }}>
              {auction.minPrice > 0 ? (
                <div>
                  {auction.highestBid > 0 ? (
                    <Button
                    variant="outline-primary"
                    size="lg"
                    style={{ marginRight: '20px' }}
                    onClick={() => acceptHighestBid()}
                    >
                    Take Highest Bid
                    </Button>) : (<></>)
                    }
                  
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={withdrawAuction}
                  >
                    Cancel Auction
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  style={{ paddingInline: '20px' }}
                  href={`/nft/${contractAddress}/${tokenId}/sell`}
                >
                  Sell
                </Button>
              )}
            </span>
          </div>
        )}
        <Row>
          <Col sm={12} lg={4} xl={4}>
            <div className="itemSummary">
              <div>
                <Card>
                  <Card.Img variant="bottom" src={NFT.image_url} />
                </Card>
              </div>
              <div
                className="itemDesc"
                style={{ marginTop: '5%', alignItems: 'center' }}
              >
                <div className="basePanel">
                  <button className="basePanelHeader">
                    <FaAlignJustify />
                    <span style={{ marginLeft: '15px' }}>Description</span>
                  </button>
                  <div className="basePanelBody">
                    <div className="panelContainer">
                      <div className="panelContent">{NFT.description}</div>
                    </div>
                  </div>
                  <div className="basePanelBody">
                    <button
                      className="basePanelHeader"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                      onClick={() => setDetails(!showDetails)}
                    >
                      <span>
                        <FaInfoCircle />
                        <span style={{ marginLeft: '15px' }}>Details</span>
                      </span>
                      <FaAngleDown />
                    </button>
                  </div>
                  {showDetails && (
                    <div className="basePanelBody">
                      <div className="panelContainer">
                        <div className="panelContent">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>Contract Address</span>
                            <span>
                              {contractAddress.slice(0, 6)}...
                              {contractAddress.slice(38)}
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>Token ID</span>
                            <span>{tokenId}</span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>Token Standard</span>
                            <span>ERC721</span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>Blockchain</span>
                            <span>Ethereum</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={8} xl={8}>
            <section className="itemHeader">
              <div className="itemCollectionInfo">
                <div className="itemCollectionDetail">
                  <a className="collectionLink" href="#">
                    NFTY collection #{NFT.token_id}
                  </a>
                </div>
                {NFT.owner ? (
                  wallet == NFT.owner.address ? (
                    auction.minPrice == 0 ? (
                    <div className="itemCollectionToolbarWrapper">
                      <div className="buttonGrp">
                        <Link
                          to={`/nft/transfer/${contractAddress}/${tokenId}`}
                        >
                          <FaGift
                            style={{
                              fontSize: '25px',
                              color: 'rgb(53, 56, 64)',
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                ))
              :(<></>)}
              </div>
              <h1 className="itemTitle">{NFT.name}</h1>
            </section>
            <section className="itemCounts">
              <div className="itemOwnerText">
                Owned by&nbsp;
                <a className="itemOwner" href="#">
                  <span>
                    {NFT.owner
                      ? wallet == NFT.owner.address
                        ? 'You'
                        : `${NFT.owner.address.slice(
                          0,
                          6,
                        )}...${NFT.owner.address.slice(38)}`
                      : 'Unknown'}
                  </span>
                </a>
              </div>
            </section>
            {auction.minPrice > 0 && (
              <section id="buyerSection">
                <div className="itemFrame">
                  <div className="basePanel">
                    <div
                      className="basePanelHeader"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'rgb(112, 122, 131)',
                      }}
                    >
                      <span>
                        <FaClock />
                        <span style={{ marginLeft: '15px', fontWeight: '400' }}>
                          Sale Ends on{' '}
                          {new Date(auction.auctionEndTimestamp * 1000).getDate() + '/' + (new Date(auction.auctionEndTimestamp * 1000).getMonth() + 1) + '/' + new Date(auction.auctionEndTimestamp * 1000).getFullYear()}
                        </span>
                      </span>
                    </div>
                    <div className="basePanelBody">
                      <div className="panelContainer">
                        <div className="panelContent">
                          <div
                            className="priceHistoryContainer"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <div style={{ color: 'rgb(112, 122, 131)' }}>
                                Minimum Price
                              </div>
                              <div>
                                <div className="priceContainer">
                                  <img
                                    style={{
                                      height: '25px',
                                      marginRight: '5px',
                                    }}
                                    src={eth}
                                  ></img>
                                  <div
                                    className="priceAmount"
                                    style={{
                                      fontSize: '30px',
                                      fontWeight: '600',
                                      marginLeft: '0.3em',
                                    }}
                                  >
                                    {auction.minPrice / 1000000000000000000}
                                  </div>
                                </div>
                                <div className="priceINR">
                                  <div
                                    className="priceAmount"
                                    style={{
                                      color: 'rgb(112, 122, 131)',
                                      fontSize: '15px',
                                      fontWeight: 'normal',
                                    }}
                                  >
                                    {/* (INR {minPriceINR}) */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div style={{ color: 'rgb(112, 122, 131)' }}>
                                Highest Bid
                              </div>
                              <div>
                                <div className="priceContainer">
                                  <img
                                    style={{
                                      height: '25px',
                                      marginRight: '5px',
                                    }}
                                    src={eth}
                                  ></img>
                                  <div
                                    className="priceAmount"
                                    style={{
                                      fontSize: '30px',
                                      fontWeight: '600',
                                      marginLeft: '0.3em',
                                    }}
                                  >
                                    {auction.highestBid / 1000000000000000000}
                                  </div>
                                </div>
                                <div className="priceINR">
                                  <div
                                    className="priceAmount"
                                    style={{
                                      color: 'rgb(112, 122, 131)',
                                      fontSize: '15px',
                                      fontWeight: 'normal',
                                    }}
                                  >
                                    {/* (INR {highestBidINR}) */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div style={{ color: 'rgb(112, 122, 131)' }}>
                                Buy Now Price
                              </div>
                              <div>
                                <div className="priceContainer">
                                  <img
                                    style={{
                                      height: '25px',
                                      marginRight: '5px',
                                    }}
                                    src={eth}
                                  ></img>
                                  <div
                                    className="priceAmount"
                                    style={{
                                      fontSize: '30px',
                                      fontWeight: '600',
                                      marginLeft: '0.3em',
                                    }}
                                  >
                                    {auction.buyNowPrice / 1000000000000000000}
                                  </div>
                                </div>
                                <div className="priceINR">
                                  <div
                                    className="priceAmount"
                                    style={{
                                      color: 'rgb(112, 122, 131)',
                                      fontSize: '15px',
                                      fontWeight: 'normal',
                                    }}
                                  >
                                    {/* (INR {buyNowINR}) */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {!(NFT.owner.address === wallet) && (
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'initial',
                                  marginTop: '2%',
                                }}
                              >
                                <Button
                                  variant="primary"
                                  size="lg"
                                  onClick={() => setBuyNowModalShow(true)}
                                >
                                  Buy Now
                                </Button>
                                <Button
                                  variant="outline-primary"
                                  size="lg"
                                  style={{ marginLeft: '2%' }}
                                  onClick={() => setModalShow(true)}
                                >
                                  Place Bid
                                </Button>
                                <PlaceBidModal
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                />
                                <BuyNowModal
                                  show={buyNowModalShow}
                                  onHide={() => setBuyNowModalShow(false)}
                                />

                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            <div className="itemFrame">
              <div className="basePanel">
                <button
                  className="basePanelHeader"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => setPriceHistor(!showPriceHistory)}
                >
                  <span>
                    <FaChartLine />
                    <span style={{ marginLeft: '15px' }}>Price History</span>
                  </span>
                  {showPriceHistory ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {showPriceHistory && (
                  <div className="basePanelBody">
                    <div className="panelContainer">
                      <div className="panelContent">
                        <div className="priceHistoryContainer">
                          <div className='priceHistoryGraph'>
                            <img src={noChartData} />
                          </div>
                          <div className="noOrdersText">No item activity yet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="itemFrame">
              <div className="basePanel">
                <button
                  className="basePanelHeader"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => setListing(!showListing)}
                >
                  <span>
                    <FaTag />
                    <span style={{ marginLeft: '15px' }}>Listings</span>
                  </span>
                  {showListing ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {showListing && (
                  <div className="basePanelBody">
                    <div className="panelContainer">
                      <div className="panelContent">
                        <div className="priceHistoryContainer">
                          <div className="priceHistoryGraph">
                            {bids && bids.length > 0 ? (
                              <Table>
                              <thead>
                                <tr>
                                  <th>Bidder</th>
                                  <th>Bid</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bids &&
                                  bids.map((bid, i) => (
                                    <tr key={i}>
                                      <td>{bid.returnValues.bidder.substring(2,7).toUpperCase()}</td>
                                      <td>{bid.returnValues.bid/1e18} ETH</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </Table>
                            ) : (
                              <div>
                                <div className="priceHistoryGraph">
                                  <img src={emptyAsks} />
                                </div>
                                <div className="noOrdersText">
                                  No listings yet
                                </div>
                              </div>
                            )}
                         </div>   
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="itemFrame">
              <div className="basePanel">
                <button
                  className="basePanelHeader"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => setOffers(!showOffers)}
                >
                  <span>
                    <FaAlignLeft />
                    <span style={{ marginLeft: '15px' }}>Offers</span>
                  </span>
                  {showOffers ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {showOffers && (
                  <div className="basePanelBody">
                    <div className="panelContainer">
                      <div className="panelContent">
                        <div className="priceHistoryContainer">
                          <div className="priceHistoryGraph">
                            <img src={emptyBids} />
                          </div>
                          <div className="noOrdersText">No offers yet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div> */}
          </Col>
        </Row>
        <Row>
          <div className="itemFrame" style={{ padding: '12px', margin: '0' }}>
            <div className="basePanel">
              <button className="basePanelHeader">
                <FaExchangeAlt />
                <span style={{ marginLeft: '15px' }}>Item Activity</span>
              </button>
              <div className="basePanelBody">
                <div className="panelContainer">
                  <div className="panelContent">
                    <Table responsive borderless>
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Price</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {txnHistory &&
                          txnHistory.map((txn, i) => (
                            <tr key={i}>
                              <td>{txn.from == 0 ? 'Minted' : 'Transfer'}</td>
                              <td>0.01</td>
                              <td>{txn.from.substring(2, 7).toUpperCase()}</td>
                              <td>{txn.to.substring(2, 7).toUpperCase()}</td>
                              <td>{moment(txn.timeStamp * 1000).fromNow()}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default NFTDescription
