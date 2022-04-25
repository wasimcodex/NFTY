import { IoIosRefresh } from 'react-icons/io'
import { FaExchangeAlt, FaAngleUp, FaAngleDown } from 'react-icons/fa'
import Table from 'react-bootstrap/Table'
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Col,
  Row,
  Alert,
} from 'react-bootstrap'
import { useState, useEffect } from 'react'

import {
  getBalance,
  depositEth,
  withdrawEth,
  transferEth,
  getTransactions,
} from '../utils/bankFunctions'

const BankInfo = ({ onAccoutChange }) => {
  const [balanceINR, setBalanceINR] = useState(0)
  const [balanceETH, setBalanceETH] = useState(0)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [exhRate, setExhRate] = useState(0)
  const [inputINR, setInputINR] = useState(null)
  const [inputETH, setInputETH] = useState(null)
  const [inputAddress, setInputAddress] = useState(null)
  const [response, setResponse] = useState(null)
  const [showTransactions, setShowTransactions] = useState(false)
  const [transactions, setTransactions] = useState([])

  const handleShowDeposit = () => {
    setShowDeposit(true)
  }

  const handleShowWithdraw = () => {
    setShowWithdraw(true)
  }

  const handleShowTransfer = () => {
    setShowTransfer(true)
  }

  const handleClose = () => {
    setShowDeposit(false)
    setShowWithdraw(false)
    setShowTransfer(false)
    setInputINR(null)
    setInputETH(null)
    setResponse(null)
  }

  const checkBalance = async () => {
    const balance = await getBalance()
    setBalanceETH(balance.eth)
    setBalanceINR(balance.inr)
    setExhRate(balance.exhRate)
  }

  const getTnxs = async () => {
    const tnxs = await getTransactions()
    console.log(tnxs)
    setTransactions(tnxs)
  }

  const handleInputINR = (e) => {
    setInputINR(e.target.value)
    setInputETH((e.target.value / exhRate).toFixed(18))
  }

  const handleDeposit = async () => {
    setResponse(null)
    const deposit = await depositEth(inputETH.toString())
    setInputETH(null)
    setInputINR(null)
    setResponse(deposit.status)
  }

  const handleWithdraw = async () => {
    if (inputINR > balanceINR) {
      setResponse('Insufficient Balance')
    } else {
      setResponse(null)
      const withdraw = await withdrawEth(inputETH.toString())
      setInputETH(null)
      setInputINR(null)
      setResponse(withdraw.status)
    }
  }

  const handleTransfer = async () => {
    if (inputINR > balanceINR) {
      setResponse('Insufficient Balance')
    } else {
      setResponse(null)
      const transfer = await transferEth(inputETH.toString(), inputAddress)
      setInputETH(null)
      setInputINR(null)
      setResponse(transfer.status)
    }
  }

  useEffect(() => {
    checkBalance()
    getTnxs()
  }, [onAccoutChange])

  return (
    <>
      <div className="balance-card">
        <h1>
          Your Balance
          <IoIosRefresh className="refresh-icon" onClick={checkBalance} />
        </h1>
        <h3 className="balance-inr">{parseFloat(balanceINR).toFixed(2)} INR</h3>
        <h3 className="balance-eth">{parseFloat(balanceETH).toFixed(4)} ETH</h3>
        {!showDeposit && !showWithdraw && !showTransfer && (
          <div className="btn-grp">
            <Button
              className="deposit-btn"
              variant="success"
              onClick={handleShowDeposit}
            >
              Deposit
            </Button>
            <Button
              className="withdraw-btn"
              variant="danger"
              onClick={handleShowWithdraw}
            >
              Withdraw
            </Button>

            <Button
              className="transfer-btn"
              variant="info"
              onClick={handleShowTransfer}
            >
              Transfer
            </Button>

            <Button
              className="loan-btn"
              variant="warning"
              href={`/applyloan`}
            >
              Apply for Loan
            </Button>
          </div>
        )}
        {showDeposit || showWithdraw ? (
          <>
            <Container>
              <Row className="justify-content-center ">
                <Col md="6">
                  <InputGroup className="amount-input">
                    <FormControl
                      placeholder="Enter Amount in INR"
                      type="number"
                      value={inputINR > 0 ? inputINR : ''}
                      onChange={handleInputINR}
                    />
                    <InputGroup.Text>INR</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="6">
                  <InputGroup className="amount-input">
                    <FormControl
                      placeholder="ETH Equivalent"
                      type="number"
                      value={inputETH > 0 ? inputETH : ''}
                      readOnly
                    />
                    <InputGroup.Text>ETH</InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </Container>
            <div className="btn-grp">
              <Button
                className="action-btn"
                variant="success"
                onClick={showDeposit ? handleDeposit : handleWithdraw}
              >
                {showDeposit ? 'Deposit' : 'Withdraw'}
              </Button>
              <Button
                className="close-btn"
                variant="danger"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
            {response && (
              <Container>
                <Row className="justify-content-center">
                  <Col md="6">
                    <Alert variant="info">{response}</Alert>
                  </Col>
                </Row>
              </Container>
            )}
          </>
        ) : null}
        {showTransfer && (
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <InputGroup className="amount-input">
                  <FormControl
                    placeholder="Enter Amount in INR"
                    type="number"
                    value={inputINR > 0 ? inputINR : ''}
                    onChange={handleInputINR}
                  />
                  <InputGroup.Text>INR</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="6">
                <InputGroup className="amount-input">
                  <FormControl
                    placeholder="ETH Equivalent"
                    type="number"
                    value={inputETH > 0 ? inputETH : ''}
                    readOnly
                  />
                  <InputGroup.Text>ETH</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="6">
                <InputGroup className="address-input">
                  <FormControl
                    placeholder="Enter Beneficiary Address"
                    type="text"
                    onChange={(e) => setInputAddress(e.target.value)}
                  />
                  <InputGroup.Text>Address</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            <div className="btn-grp">
              <Button
                className="action-btn"
                variant="success"
                onClick={handleTransfer}
              >
                Transfer
              </Button>
              <Button
                className="close-btn"
                variant="danger"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
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
        )}
      </div>
      <Container>
        <Row>
          <div className="itemFrame" style={{ padding: '12px', margin: '0' }}>
            <div className="basePanel">
              <button
                className="basePanelHeader"
                style={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => setShowTransactions(!showTransactions)}
              >
                <span>
                  <FaExchangeAlt />
                  <span style={{ marginLeft: '15px' }}>
                    Transaction History
                  </span>
                </span>
                {showTransactions ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {showTransactions && (
                <div className="basePanelBody">
                  <div className="panelContainer">
                    <div className="panelContent">
                      <Table responsive borderless>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Value</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Balance </th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions
                            .slice(0)
                            .reverse()
                            .map((transaction, index) => (
                              <tr key={index}>
                                <td>{transaction.event}</td>
                                <td>
                                  {(
                                    transaction.returnValues.amount /
                                    Math.pow(10, 18)
                                  ).toFixed(4)}
                                </td>
                                <td>
                                  {transaction.event === 'Transfer'
                                    ? transaction.returnValues.from
                                        .slice(2, 8)
                                        .toUpperCase()
                                    : transaction.event === 'Deposit'
                                    ? 'Wallet'
                                    : 'Self'}
                                </td>
                                <td>
                                  {transaction.event === 'Transfer'
                                    ? transaction.returnValues.to
                                        .slice(2, 8)
                                        .toUpperCase()
                                    : transaction.event === 'Withdraw'
                                    ? 'Wallet'
                                    : 'Self'}
                                </td>
                                {transaction.event === 'Transfer' &&
                                  transaction.returnValues.from.toLowerCase() ===
                                    window.ethereum.selectedAddress && (
                                    <td>
                                      {(
                                        transaction.returnValues.balanceSender /
                                        Math.pow(10, 18)
                                      ).toFixed(4)}
                                    </td>
                                  )}
                                {transaction.event === 'Transfer' &&
                                  transaction.returnValues.to.toLowerCase() ===
                                    window.ethereum.selectedAddress && (
                                    <td>
                                      {(
                                        transaction.returnValues
                                          .balanceReceiver / Math.pow(10, 18)
                                      ).toFixed(4)}
                                    </td>
                                  )}
                                {(transaction.event === 'Deposit' ||
                                  transaction.event === 'Withdraw') && (
                                  <td>
                                    {(
                                      transaction.returnValues.balance /
                                      Math.pow(10, 18)
                                    ).toFixed(4)}
                                  </td>
                                )}
                                <td>
                                  {new Date(
                                    transaction.returnValues.timestamp * 1000,
                                  ).toLocaleDateString('en-IN')}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default BankInfo
