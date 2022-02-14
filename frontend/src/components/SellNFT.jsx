import React from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Col,
  Form,
  Card,
  Row,
  Alert,
} from 'react-bootstrap'
import imagePlaceholder from '../assets/image-placeholder.png'
import {useParams} from 'react-router-dom'
import {exchangeRate} from '../utils/bankFunctions';
import {createAuction} from '../utils/auctionFunctions';

function SellNFT() {
  let { contractAddress, tokenId } = useParams()  
  const [exhRate, setExhRate] = React.useState(0)
  const [inputETH, setInputETH] = React.useState(0)
  const [buyNowPrice, setBuyNowPrice] = React.useState(0)
  const [auctionEndDate, setAuctionEndDate] = React.useState(0)
  const [response, setResponse] = React.useState(null)
  
  const handleInputINR = async(e) => {
    const rate = await exchangeRate()
    setExhRate(rate)
    setInputETH((e.target.value / exhRate).toFixed(18))
  }

  const handleInputBuyNowPrice = async(e) => {
    const rate = await exchangeRate()
    setExhRate(rate)
    setBuyNowPrice((e.target.value / exhRate).toFixed(18))
  }
  const auctionCreate = async() => {
    console.log(contractAddress, tokenId, inputETH, buyNowPrice, auctionEndDate)
    const completeListing = await createAuction(contractAddress, tokenId, inputETH, buyNowPrice, auctionEndDate)
    setResponse(completeListing.status)
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg={6} sm={12}>
            <h1 className='heading'>List Item for Sale</h1>
            {/* <div className='sellOptions'>
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
            </div> */}
            <div className='sellOptions'>
              <p className='text'>Price</p>
              <div classsName='options'>
                  <InputGroup>
                    <FormControl
                      placeholder="Enter Amount in INR"
                      type="number"
                      onChange={handleInputINR}
                    />
                    <InputGroup.Text>INR</InputGroup.Text>
                  </InputGroup>
                  <InputGroup>
                    <FormControl
                      placeholder="ETH Equivalent"
                      type="number"
                      value={inputETH > 0 ? inputETH : ''}
                      readOnly
                    />
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup>
              </div>
            </div>
            <div className='sellOptions'>
              <p className='text'>Duration</p>
              <div classsName='options'>
                <Row>
                  <Col>
                    <Form.Label size="lg">End Date</Form.Label>
                    <Form.Control size="lg" type="date" onChange={e => setAuctionEndDate(e.target.value)}/>
                  </Col>
                </Row>
              </div>
            </div>
            <div className='sellOptions'>
            <p className='text'>Add Buy Now Price</p>
              <div classsName='options'>
              <InputGroup>
                    <FormControl
                      placeholder="Enter Amount in INR"
                      type="number"
                      onChange={handleInputBuyNowPrice}
                    />
                    <InputGroup.Text>INR</InputGroup.Text>
                  </InputGroup>
                  <InputGroup>
                    <FormControl
                      placeholder="ETH Equivalent"
                      type="number"
                      value={buyNowPrice > 0 ? buyNowPrice : ''}
                      readOnly
                    />
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup>
                {/* <div style={{display: 'flex',justifyContent: 'space-between'}}>
                  <Form.Control size="lg" type="number" placeholder="Amount" onChange={e => setBuyNowPrice(e.target.value)}/>
                </div>    */}
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
                <Button variant="primary" size="lg" onClick={auctionCreate}>Complete Listing</Button>
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
        {response && (
              <Container>
                <Row className="justify-content-center">
                  <Col md="6">
                    <Alert variant="info">{response}</Alert>
                  </Col>
                </Row>
              </Container>
        )}
      </Container>
    </div>);
}

export default SellNFT;
