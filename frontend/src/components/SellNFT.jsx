import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FaClock, FaRupeeSign } from 'react-icons/fa';
import imagePlaceholder from '../assets/image-placeholder.png'

function SellNFT() {
  return (
    <div>
      <Container>
        <Row>
          <Col lg={6} sm={12}>
            <h1 className='heading'>List Item for Sale</h1>
            <div className='sellOptions'>
              <p className='text'>Type</p>
              <div classsName='options'>
                <Row>
                <Col style={{padding: 0}}>
                  <button className='priceBtnLeft'>
                    <div className='symbol'>
                      <FaRupeeSign />
                    </div>
                    <div>Fixed Price</div>
                  </button>
                </Col>
                <Col style={{padding: 0}}>
                  <button className='priceBtnRight'>
                    <div className='symbol'>
                      <FaClock />
                    </div>
                    <div>Timed Auction</div>
                  </button>
                </Col>
                </Row> 
              </div>
            </div>
            <div className='sellOptions'>
              <p className='text'>Price</p>
              <div classsName='options'>
                <Row>
                  <Col lg={3}>
                  <Form.Select size="lg">
                    <option>ETH</option>
                    <option>INR</option>
                  </Form.Select>
                  </Col>
                  <Col>
                    <Form.Control size="lg" type="number" placeholder="Amount" />
                  </Col>
                </Row>
              </div>
            </div>
            <div className='sellOptions'>
              <p className='text'>Duration</p>
              <div classsName='options'>
                <Row>
                  <Col>
                    <Form.Label size="lg">Start Date</Form.Label>
                    <Form.Control size="lg" type="date" />
                  </Col>
                  <Col>
                    <Form.Label size="lg">End Date</Form.Label>
                    <Form.Control size="lg" type="date" />
                  </Col>
                </Row>
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
                <Button variant="primary" size="lg">Complete Listing</Button>
              </div>
            </div>
          </Col>
          <Col lg={2} sm={0}></Col>
          <Col lg={4} sm={12}>
            <div className='sideHeading'>Preview</div>
            <div className="sellOptions">
              <div>
                <Card>
                  <Card.Img variant="bottom" src={imagePlaceholder} />
                  <Card.Body>
                  <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <Card.Subtitle className="mb-2 text-muted">Collection name</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
                  </div>
                  <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <Card.Title>NFT Title</Card.Title>
                  <Card.Title>1 ETH</Card.Title>
                  </div>
                  
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>);
}

export default SellNFT;
