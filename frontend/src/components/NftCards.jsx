import React from 'react'
import eth from '../assets/eth.svg'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const NftCards = ({ nft, selectNFT }) => {
  const index = 1
  console.log(nft)
  return (
    <Link
      className="nav-link"
      to={
        selectNFT ? '#' : `/nft/${nft.asset_contract.address}/${nft.token_id}`
      }
      nft={nft}
    >
      <Card
        onClick={() => {
          if (selectNFT) {
            selectNFT(nft)
          }
        }}
      >
        <Card.Img className="cardImg" variant="top" src={nft.image_url} />
        <Card.Body>
          <Container style={{ padding: '0px' }}>
            <Row>
              <Col xs={8}>
                <Card.Title style={{ fontSize: '16px' }}>
                  {nft.name}{' '}
                  <span style={{ color: 'magenta' }}>{'#' + nft.token_id}</span>
                </Card.Title>
                <Card.Text style={{ fontSize: '16px', color: 'grey' }}>
                  {nft.description != null && nft.description.length > 100
                    ? nft.description.substring(0, 40) + '...'
                    : nft.description}
                </Card.Text>
              </Col>
              <Col style={{ textAlign: 'right', fontSize: '16px' }}>
                <p>
                  Price <br />
                  <img
                    style={{ height: '20px', marginRight: '5px' }}
                    src={eth}
                  ></img>
                  {nft.price !== undefined
                    ? (parseInt(nft.price) / 1000000000000000000).toFixed(4)
                    : '0'}
                </p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default NftCards
