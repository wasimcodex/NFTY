import React from 'react'
import eth from '../assets/eth.svg'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NftCards = ({ nft }) => {
  const index = 1
  return (
    <Link
      className="nav-link"
      to={`/nft/${nft.asset_contract.address}/${nft.token_id}`}
      nft={nft}
    >
      <Card>
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
                  {nft.description.slice(0, 100) + '...'}
                </Card.Text>
              </Col>
              <Col style={{ textAlign: 'right', fontSize: '16px' }}>
                <p>
                  Price <br />
                  <img
                    style={{ height: '20px', marginRight: '5px' }}
                    src={eth}
                  ></img>
                  0.01
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
