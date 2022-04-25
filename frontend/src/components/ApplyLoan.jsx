import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Col,
  Form,
  Card,
  Row,
  Tabs,
  Tab,
} from 'react-bootstrap';
import Explore from './Explore';
import imagePlaceholder from '../assets/image-placeholder.png';
import eth from '../assets/eth.svg';
import LoanConfirmModal from './LoanConfirmModal';
import LoanDetails from './LoanDetails';

function ApplyLoan() {
  const [key, setKey] = useState('apply');
  const [modalShow, setModalShow] = useState(false)
  return (
    <div>
      <Container>
        <div style={{ marginTop: '2%' }}>
          <Tabs
              justify
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="apply" title="Loan Application">
                <div style={{ borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', borderLeft: '1px solid #dee2e6', padding: '20px'}}>
                  <Row>
                    <Col lg={6} sm={12}>
                      <h1 className='heading'>Apply for Loan</h1>
                      <p>(Select an NFT from your collection displayed below which you wish to submit as collateral while applying for loan.)</p>
                      <Form>
                        <Form.Group as={Row} className="mb-3" controlId="loanAmount">
                          <Form.Label column sm="3">
                            Amount (INR)
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control type="number" placeholder="Enter Loan Amount in INR"/>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="loanAmountINR">
                          <Form.Label column sm="3">
                            Amount (ETH)
                          </Form.Label>
                          <Col sm="9">
                            <Form.Control type="number" placeholder="Loan Amount in ETH" readOnly />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="emiduration">
                          <Form.Label column sm="3">
                            EMI Duration
                          </Form.Label>
                            <Col sm="9">
                              <Form.Check
                                inline
                                label="6 Months"
                                type="radio"
                                name="duration"
                              />
                              <Form.Check
                                inline
                                label="12 Months"
                                type="radio"
                                name="duration"
                              />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="loan_granted">
                          <Form.Label column sm="12">
                            Loan Amount that can be provided
                          </Form.Label>
                          <Row>
                            <Col lg={6}>
                              <InputGroup>
                                <FormControl
                                  placeholder="Amount in ETH"
                                  type="number"
                                  readOnly
                                />
                                <InputGroup.Text>ETH</InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col lg={6}>
                              <InputGroup>
                                <FormControl
                                  placeholder="Amount in INR"
                                  type="number"
                                  readOnly
                                />
                                <InputGroup.Text>INR</InputGroup.Text>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="interest_rate">
                          <Form.Label column sm="3">
                            Interest rate
                          </Form.Label>
                          <Col sm="9">
                            <InputGroup> 
                              <Form.Control type="number" placeholder="Interest rate" readOnly />
                              <InputGroup.Text>p.c.p.a.</InputGroup.Text>
                            </InputGroup>
                          </Col>        
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="emi_amount">
                          <Form.Label column sm="12">
                            EMI to be paid per month
                          </Form.Label>
                          <Row>
                            <Col lg={6}>
                              <InputGroup>
                                <FormControl
                                  placeholder="Amount in ETH"
                                  type="number"
                                  readOnly
                                />
                                <InputGroup.Text>ETH</InputGroup.Text>
                              </InputGroup>
                            </Col>
                            <Col lg={6}>
                              <InputGroup>
                                <FormControl
                                  placeholder="Amount in INR"
                                  type="number"
                                  readOnly
                                />
                                <InputGroup.Text>INR</InputGroup.Text>
                              </InputGroup>
                            </Col>
                          </Row>
                        </Form.Group>

                        <Button 
                          variant="primary" 
                          onClick={() => setModalShow(true)}
                        >
                          Apply
                        </Button>
                        <LoanConfirmModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />

                      </Form>
                    </Col>
                    <Col lg={2} sm={0}></Col>
                    <Col lg={4} sm={12}>
                      <div className='sideHeading'>NFT Preview</div>
                      <div className="sellOptions">
                        <div>
                          <Card>
                            <Card.Img variant="bottom" src={imagePlaceholder} />
                            <Card.Body>
                              <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                <Card.Subtitle>Name</Card.Subtitle>
                                <Card.Subtitle>
                                  <img
                                    style={{ height: '20px', marginRight: '5px' }}
                                    src={eth}
                                  ></img>
                                  <strong>0.5</strong>
                                </Card.Subtitle>
                              </div>        
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <h3>NFT Collection</h3>
                  </div>
                  <Explore />
                </div>
              </Tab>

              <Tab eventKey="details" title="Loan Details">
                <div style={{ borderBottom: '1px solid #dee2e6', borderRight: '1px solid #dee2e6', borderLeft: '1px solid #dee2e6', padding: '10px'}}>
                  <LoanDetails />
                </div>
              </Tab>

          </Tabs>
        </div>
      </Container>  
    </div>
  )
}

export default ApplyLoan;