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

import { repayLoanAmountFromAccount, loanEMIAccount } from '../utils/bankFunctions';

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

const repayLoan = async (amount) => {
  const data = await repayLoanAmountFromAccount(amount)
  return data
}

const payEmi = async (amount) => { 
  const data = await loanEMIAccount(amount)
  return data
}


function LoanDetails({ loan }) {
  const [nftData, setNftData] = useState(null)
  const [showDetails, setDetails] = useState(false)
  useEffect(() => { 
    const getData = async () => {
      if (loan) {
        console.log(loan)
        getNftData(loan.nftContractAddress, loan.tokenId)
          .then((data) => {
            console.log(data)
            setNftData(data)
          })
      }
    }
    getData()
  }, [loan])
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
                        <strong>{ loan ? (loan.repay_amount / 1000000000000000000).toFixed(4)  : ''}</strong>
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
                        <strong>{loan ? (loan.balance_amount / 1000000000000000000).toFixed(4) : ''}</strong>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>Total number of EMIs</Col>
                  <Col>
                    {loan ? loan.due : ''}
                  </Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>EMIs to be paid</Col>
                  <Col>
                    {loan ? parseInt(loan.balance_amount / loan.emi) + 1: ''}
                  </Col>
                </Row>
                <Row
                  className="text"
                  style={{ marginBottom: '1.25%', fontSize: '17px' }}
                >
                  <Col>Interest Rate</Col>
                  <Col>
                    10 p.c.p.a
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: '20px'}}>
                  <div style={{display: 'flex', marginTop: '20px'}}>
                  <Button 
                    variant="primary"
                    onClick={() => { payEmi((loan.emi / 1000000000000000000).toFixed(4).toString())}}
                  >
                    Pay EMI
                  </Button>
                    <Button 
                      style={{ marginLeft: '2%' }}
                    variant="outline-primary" 
                    onClick={() => repayLoan((loan.balance_amount / 1000000000000000000).toFixed(4).toString())}
                    >
                      Repay Loan
                    </Button>
                  </div>
              </div>
              {/* <div className="itemFrame" style={{ margin: '20px 0'}}>
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
              </div> */}
            </div>            
          </Col>
          <Col lg={4} sm={12}>
            <div className="sideHeading">NFT Preview</div>
            <div className="itemSummary">
              <div>
                <Card>
                  <Card.Img variant="bottom" src={nftData ? nftData.image_url : imagePlaceholder} />
                  <Card.Body>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Card.Subtitle>Name</Card.Subtitle>
                      <Card.Subtitle>
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
