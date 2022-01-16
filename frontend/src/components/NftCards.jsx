import React from 'react'
import eth from '../assets/eth.svg'
import { Row, Col, Card, Container } from 'react-bootstrap'

const NftCards = ({ NFTArray }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Row xs={1} md={3} className="g-4">
        {NFTArray.map((nft, index) => (
          <Col>
            <Card>
              <Card.Img className="cardImg" variant="top" src={nft.image} />
              <Card.Body>
                <Container style={{ padding: '0px' }}>
                  <Row>
                    <Col xs={8}>
                      <Card.Title style={{ fontSize: '16px' }}>
                        {nft.name}{' '}
                        <span style={{ color: 'magenta' }}>
                          {'#' + (index + 1)}
                        </span>
                      </Card.Title>
                      <Card.Text style={{ fontSize: '16px', color: 'grey' }}>
                        {nft.description}
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
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default NftCards
