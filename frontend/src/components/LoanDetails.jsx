import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Container, Col, Form, Card, Row, Table } from 'react-bootstrap'
import {
  FaExchangeAlt,
  FaInfoCircle,
  FaAlignJustify,
  FaAngleDown,
} from 'react-icons/fa'
import imagePlaceholder from '../assets/image-placeholder.png'
import eth from '../assets/eth.svg'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(alchemyKey)

const { address, abi } = require('../artifacts/bank.json')

const getloanDetails = async (address) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const loan = await window.contract.methods.Loan(address).call()
  console.log('loan')
  console.log(loan)
  return loan
}

function LoanDetails() {
  useEffect(() => {
    const getLoanDetails = async () => {
      const loanDetails = await getloanDetails(address)
      console.log(loanDetails)
    }
    getLoanDetails()
  }, [])
  const [showDetails, setDetails] = useState(false)
  return (
    <div>
      <Container>
        <Row>
          <Col lg={8} sm={12}>
            <div>
              <h1 className="heading">Loan Details</h1>
              <div>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>Total Loan Amount</Col>
                  <Col>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <img
                          style={{ height: '20px', marginRight: '5px' }}
                          src={eth}
                        />
                        <strong>0.5</strong>
                      </div>
                      <div
                        style={{
                          marginLeft: '10px',
                          color: 'rgb(112, 122, 131)',
                          fontWeight: 'normal',
                        }}
                      >
                        (100000 INR)
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>Amount to be paid</Col>
                  <Col>
                    <div style={{ display: 'flex' }}>
                      <div>
                        <img
                          style={{ height: '20px', marginRight: '5px' }}
                          src={eth}
                        />
                        <strong>0.25</strong>
                      </div>
                      <div
                        style={{
                          marginLeft: '10px',
                          color: 'rgb(112, 122, 131)',
                          fontWeight: 'normal',
                        }}
                      >
                        (50000 INR)
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>Total number of EMIs</Col>
                  <Col>6</Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>EMIs to be paid</Col>
                  <Col>3</Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>Interest Rate</Col>
                  <Col>12 p.c.p.a</Col>
                </Row>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div
                  style={{
                    fontWeight: '600',
                    color: 'rgb(4, 17, 29)',
                    fontSize: '18px',
                    marginBottom: '10px',
                  }}
                >
                  Payment Methods
                </div>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="paymentoptions"
                  >
                    <Col>
                      <Form.Check
                        inline
                        label="Using Wallet"
                        type="radio"
                        name="options"
                      />
                      <Form.Check
                        inline
                        label="Using Bank Account"
                        type="radio"
                        name="options"
                      />
                    </Col>
                  </Form.Group>
                  <div style={{ display: 'flex', marginTop: '20px' }}>
                    <Button variant="primary">Pay EMI</Button>
                    <Button
                      style={{ marginLeft: '2%' }}
                      variant="outline-primary"
                    >
                      Repay Loan
                    </Button>
                  </div>
                </Form>
              </div>
              <div className="itemFrame" style={{ margin: '20px 0' }}>
                <div className="basePanel">
                  <button className="basePanelHeader">
                    <FaExchangeAlt />
                    <span style={{ marginLeft: '15px' }}>Loan Activity</span>
                  </button>
                  <div className="basePanelBody">
                    <div className="panelContainer">
                      <div className="panelContent">
                        <Table responsive borderless>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Amount paid</th>
                              <th>Amount left </th>
                              <th>Via</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>02/02/2022</td>
                              <td>4000 INR</td>
                              <td>12000 INR</td>
                              <td>Bank Balance</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={12}>
            <div className="sideHeading">NFT Preview</div>
            <div className="itemSummary">
              <div>
                <Card>
                  <Card.Img variant="bottom" src={imagePlaceholder} />
                  <Card.Body>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
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
                      <div className="panelContent">New NFT</div>
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
                            <span>09fbfherbf334</span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>Token ID</span>
                            <span>5</span>
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
        </Row>
      </Container>
    </div>
  )
}

export default LoanDetails
