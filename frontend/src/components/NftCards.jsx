import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const NftCards = ({ NFTArray }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Row xs={1} md={3} className="g-4">
        {NFTArray.map((nft, index) => (
          <Col>
            <Card>
              <Card.Img variant="top" src={nft.image} />
              <Card.Body>
                <Card.Title>{nft.name + ' #' + (index + 1)}</Card.Title>
                <Card.Text>{nft.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default NftCards
