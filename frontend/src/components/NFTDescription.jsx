import React from 'react'
// import div from 'react-bootstrap/div'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
  FaAlignJustify,
  FaAlignLeft,
  FaAngleDown,
  FaAngleUp,
  FaChartLine,
  FaExchangeAlt,
  FaFolder,
  FaGift,
  FaInfoCircle,
  FaTag,
} from 'react-icons/fa'

import noChartData from '../assets/no-chart-data.svg'
import emptyAsks from '../assets/empty-asks.svg'
import emptyBids from '../assets/empty-bids.svg'

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

function NFTDescription({ wallet }) {
  let { contractAddress, tokenId } = useParams()
  const [NFT, setNFT] = useState({})
  const [showPriceHistory, setPriceHistor] = useState(true)
  const [showListing, setListing] = useState(false)
  const [showOffers, setOffers] = useState(false)
  const [showDetails, setDetails] = useState(false)
  useEffect(() => {
    console.log(contractAddress, tokenId)
    async function getNft() {
      const nft = await getNftData(contractAddress, tokenId)
      setNFT(nft)
    }
    getNft()
  }, [])
  return (
    <div>
      <Container>
        <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
          <span style={{ marginRight: '20px' }}>
            <Button
              variant="primary"
              size="lg"
              style={{ paddingInline: '20px' }}
            >
              Sell
            </Button>
          </span>
        </div>
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
                    <div className="itemCollectionToolbarWrapper">
                      <div className="buttonGrp">
                        <Link
                          to={`/nft/transfer/${contractAddress}/${tokenId}`}
                        >
                          <FaGift style={{ fontSize: '18px' }} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
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
                          <div className="priceHistoryGraph">
                            <img src={noChartData} />
                          </div>
                          <div className="noOrdersText">
                            No item activity yet
                          </div>
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
                            <img src={emptyAsks} />
                          </div>
                          <div className="noOrdersText">No listings yet</div>
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
            </div>
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
                        <tr>
                          <td>Minted</td>
                          <td>0.001 ETH</td>
                          <td>Null Address</td>
                          <td>You</td>
                          <td>3 days ago</td>
                        </tr>
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
