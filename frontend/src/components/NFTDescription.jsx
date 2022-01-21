import React from 'react'
// import div from 'react-bootstrap/div'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import {FaAlignJustify, FaAlignLeft, FaAngleDown, FaChartLine, FaExchangeAlt, FaFolder, FaGift, FaInfoCircle, FaTag} from 'react-icons/fa'

function NFTDescription() {
  return (
    <div>
      
      <Container>
        <div style={{justifyContent: 'center', display: 'flex'}}>
          <span style={{padding: '1%'}}><Button variant="outline-primary" size="lg">Edit</Button></span>
          <span style={{padding: '1%'}}><Button variant="primary" size="lg">Sell</Button></span>           
        </div>
        <Row>
        <Col sm={12} lg={4} xl={4}>
          <div className='itemSummary'>
            <div>
              <Card>
                <Card.Img variant="bottom" src="logo512.png" />
              </Card>
            </div>
            <div className='itemDesc' style={{marginTop: '5%', alignItems: 'center'}}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <FaAlignJustify />
                  <span style={{marginLeft: '5%'}}>Description</span>
                </Card.Title> 
              </Card.Body>
              <hr style={{margin: '0px'}} />
              <Card.Body>
                <Card.Text>NFT Description</Card.Text>
              </Card.Body>
              <hr style={{margin: '0px'}} />
              <Card.Body>
                <Card.Title>
                  <FaFolder />
                  <span style={{marginLeft: '5%'}}>About Untitled Collection</span>
                </Card.Title> 
              </Card.Body>
              <hr style={{margin: '0px'}} />
              <Card.Body>
                <Card.Text>You own this collection</Card.Text>
              </Card.Body>
              <hr style={{margin: '0px'}} />
              <Card.Body>
                <Card.Title>
                  <FaInfoCircle />
                  <span style={{marginLeft: '5%'}}>Details</span>
                  {/* <span style={{marginLeft: '70%'}}><FaAngleDown /></span> */}
                </Card.Title> 
              </Card.Body>
              <hr style={{margin: '0px'}} />
              <Card.Body>
                <Card.Text>
                    <div style={{justifyContent: 'space-between', display:'flex'}}>Contact Address<span style={{textAlign: 'right', maxWidth: '365px'}}>0x02f..dD</span></div>
                    <div style={{justifyContent: 'space-between', display:'flex'}}>Token ID<span style={{textAlign: 'right', maxWidth: '365px'}}>135674....</span></div>
                    <div style={{justifyContent: 'space-between', display:'flex'}}>Token Standard<span style={{textAlign: 'right', maxWidth: '365px'}}>ERC-1155</span></div>
                    <div style={{justifyContent: 'space-between', display:'flex'}}>Blockchain<span style={{textAlign: 'right', maxWidth: '365px'}}>Ethereum</span></div>
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
          </div>
        </Col>
        <Col sm={12} lg={8} xl={8}>
          <section className='itemHeader'>
            <div className='itemCollectionInfo'>
              <div className='itemCollectionDetail'>
                <a className='collectionLink' href='#'>
                  Untitled collection #10983223
                </a>
              </div>
              <div className='itemCollectionToolbarWrapper'>
                <div className='buttonGrp'>
                  <FaGift />
                </div>
              </div>
            </div>
            <h1 className='itemTitle'>React Icon</h1>
          </section>
          <section className='itemCounts'>
            <div className='itemOwnerText'>
              Owned by&nbsp;
              <a className='itemOwner' href='#'>
                <span>you</span>
              </a>
            </div>
          </section>
          <div className='itemFrame'>
            <div className='basePanel'>
              <button className='basePanelHeader'>
                <FaChartLine />
                <span style={{marginLeft: '3%'}}>Price History</span>
              </button>
              <div className='basePanelBody'>
                <div className='panelContainer'>
                  <div className='panelContent'>
                    <div className='priceHistoryContainer'>
                      <div className='priceHistoryGraph'>
                        <img src='no-chart-data.svg' />
                      </div>
                      <div className='noOrdersText'>No item activity yet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='itemFrame'>
            <div className='basePanel'>
              <button className='basePanelHeader'>
                <FaTag />
                <span style={{marginLeft: '3%'}}>Listings</span>
              </button>
              <div className='basePanelBody'>
                <div className='panelContainer'>
                  <div className='panelContent'>
                    <div className='priceHistoryContainer'>
                      <div className='priceHistoryGraph'>
                        <img src='no-chart-data.svg' />
                      </div>
                      <div className='noOrdersText'>No listings yet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='itemFrame'>
            <div className='basePanel'>
              <button className='basePanelHeader'>
                <FaAlignLeft />
                <span style={{marginLeft: '3%'}}>Offers</span>
              </button>
              <div className='basePanelBody'>
                <div className='panelContainer'>
                  <div className='panelContent'>
                    <div className='priceHistoryContainer'>
                      <div className='priceHistoryGraph'>
                        <img src='no-chart-data.svg' />
                      </div>
                      <div className='noOrdersText'>No offers yet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        </Row>
        <Row>
          <div className='itemFrame' style={{padding: '12px', margin: '0'}}>
            <div className='basePanel'>
              <button className='basePanelHeader'>
                <FaExchangeAlt />
                <span style={{marginLeft: '3%'}}>Item Activity</span>
              </button>
              <div className='basePanelBody'>
                <div className='panelContainer'>
                  <div className='panelContent' style={{padding: '0'}}>
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
                          <td>Null addr</td>
                          <td>you</td>
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
