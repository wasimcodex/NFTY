import React from 'react'
import { useState, useEffect } from 'react'
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
} from 'react-bootstrap'
import Explore from './Explore'
import imagePlaceholder from '../assets/image-placeholder.png'
import eth from '../assets/eth.svg'
import LoanConfirmModal from './LoanConfirmModal'
import LoanDetails from './LoanDetails'

import { applyBankLoan } from '../utils/bankFunctions'
import { approveNft } from '../utils/nftApprove'

const { address, abi } = require('../artifacts/bank.json')

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const getloanDetails = async (wallet) => {
  window.contract = await new web3.eth.Contract(abi, address)
  const loan = await window.contract.methods.Loan(wallet).call()
  console.log('loan')
  console.log(loan)
  return loan
}

const getAllEvents = async () => {
  window.contract = await new web3.eth.Contract(abi, address)
  const allEvents = await window.contract.getPastEvents('allEvents', {
    fromBlock: 0,
    toBlock: 'latest',
  })
  console.log(allEvents)
  return allEvents
}


function ApplyLoan({ wallet }) {
  const [key, setKey] = useState('apply')
  const [modalShow, setModalShow] = useState(false)
  const [loanAmount, setLoanAmount] = useState('')
  const [loanAmountETH, setLoanAmountETH] = useState('')
  const [exchangeRate, setExchangeRate] = useState('')
  const [interestRate, setInterestRate] = useState(10)
  const [months, setMonths] = useState(6)
  const [selectedNFT, setSelectedNFT] = useState({})
  const [loanDetails, setLoanDetails] = useState({})

  const getExchangeRate = async () => {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr',
    )
    const data = await response.json()
    return data.ethereum.inr
  }

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value)
    setLoanAmountETH(e.target.value / exchangeRate)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const approve = await approveNft(address, selectedNFT.token_id)
    const applyLoan = applyBankLoan(
      selectedNFT.asset_contract.address,
      selectedNFT.token_id,
      loanAmountETH.toString(),
      months,
      (loanAmountETH + loanAmountETH * (interestRate / 100)).toString(),
      (
        ((loanAmountETH + loanAmountETH * (interestRate / 100)) / months) *
        exchangeRate
      ).toFixed(0),
      ((loanAmountETH + loanAmountETH * (interestRate / 100)) / months)
        .toFixed(18)
        .toString(),
    )
  }

  useEffect(() => {
    const saveExchangeRate = async () => {
      const exchangeRate = await getExchangeRate()
      setExchangeRate(exchangeRate)
      console.log(wallet)
      if (wallet) {
        const loan = await getloanDetails(wallet)
        setLoanDetails(loan)
      }
      const events = await getAllEvents()
    }
    saveExchangeRate()
  }, [wallet])

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
              <div
                style={{
                  borderBottom: '1px solid #dee2e6',
                  borderRight: '1px solid #dee2e6',
                  borderLeft: '1px solid #dee2e6',
                  padding: '20px',
                }}
              >
                <Row>
                  <Col lg={6} sm={12}>
                    <h1 className="heading">Apply for Loan</h1>
                    <p>
                      (Select an NFT from your collection displayed below which
                      you wish to submit as collateral while applying for loan.)
                    </p>
                    <Form>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="loanAmount"
                      >
                        <Form.Label column sm="3">
                          Amount (INR)
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="number"
                            placeholder="Enter Loan Amount in INR"
                            onChange={(e) => handleLoanAmountChange(e)}
                            value={loanAmount}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="loanAmountINR"
                      >
                        <Form.Label column sm="3">
                          Amount (ETH)
                        </Form.Label>
                        <Col sm="9">
                          <Form.Control
                            type="number"
                            placeholder="Loan Amount in ETH"
                            readOnly
                            value={loanAmountETH}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="emiduration"
                      >
                        <Form.Label column sm="3">
                          EMI Duration
                        </Form.Label>
                        <Col sm="9">
                          <Form.Check
                            inline
                            label="6 Months"
                            defaultChecked
                            type="radio"
                            name="duration"
                            onChange={(e) => {
                              setMonths(6)
                              setInterestRate(10)
                            }}
                          />
                          <Form.Check
                            inline
                            label="12 Months"
                            type="radio"
                            name="duration"
                            onChange={(e) => {
                              setMonths(12)
                              setInterestRate(15)
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="loan_granted"
                      >
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
                                value={
                                  selectedNFT.price
                                    ? (
                                        (selectedNFT.price /
                                          1000000000000000000) *
                                        0.8
                                      ).toFixed(4)
                                    : ''
                                }
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
                                value={
                                  selectedNFT.price
                                    ? (
                                        (selectedNFT.price /
                                          1000000000000000000) *
                                        exchangeRate *
                                        0.8
                                      ).toFixed(2)
                                    : ''
                                }
                              />
                              <InputGroup.Text>INR</InputGroup.Text>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="interest_rate"
                      >
                        <Form.Label column sm="3">
                          Interest rate
                        </Form.Label>
                        <Col sm="9">
                          <InputGroup>
                            <Form.Control
                              type="number"
                              placeholder="Interest rate"
                              readOnly
                              value={interestRate}
                            />
                            <InputGroup.Text>p.c.p.a.</InputGroup.Text>
                          </InputGroup>
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="emi_amount"
                      >
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
                                value={(
                                  (loanAmountETH +
                                    loanAmountETH * (interestRate / 100)) /
                                  months
                                ).toPrecision(4)}
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
                                value={(
                                  ((loanAmountETH +
                                    loanAmountETH * (interestRate / 100)) /
                                    months) *
                                  exchangeRate
                                ).toFixed(2)}
                              />
                              <InputGroup.Text>INR</InputGroup.Text>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={(e) => handleSubmit(e)}
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
                    <div className="sideHeading">NFT Preview</div>
                    <div className="sellOptions">
                      <div>
                        <Card>
                          <Card.Img
                            variant="bottom"
                            src={selectedNFT.image_url || imagePlaceholder}
                          />
                          <Card.Body>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Card.Subtitle>
                                {selectedNFT.name || 'Name'}
                              </Card.Subtitle>
                              <Card.Subtitle>
                                <img
                                  style={{ height: '20px', marginRight: '5px' }}
                                  src={eth}
                                ></img>
                                <strong>
                                  {selectedNFT.price
                                    ? (
                                        selectedNFT.price / 1000000000000000000
                                      ).toFixed(4)
                                    : '0.00'}
                                </strong>
                              </Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </Col>
                </Row>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <h3>NFT Collection</h3>
                </div>
                <Explore owner={wallet} selectNFT={setSelectedNFT} />
              </div>
            </Tab>

            <Tab eventKey="details" title="Loan Details">
              <div
                style={{
                  borderBottom: '1px solid #dee2e6',
                  borderRight: '1px solid #dee2e6',
                  borderLeft: '1px solid #dee2e6',
                  padding: '10px',
                }}
              >
                <LoanDetails loan={loanDetails}/>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}

export default ApplyLoan
