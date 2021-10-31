import React, { useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import {
  checkBalance,
  depositEth,
  withdrawETH,
  checkPool,
} from '../utils/bankActions'
import ConnetBtn from './ConnectBtn'

function Bank() {
  const [Status, setStatus] = useState('')
  const [Balance, setBalance] = useState(0)
  const [Pool, setPool] = useState(0)
  const [Deposit, setDeposit] = useState(0)
  const [Withdraw, setWithdraw] = useState(0)

  const onDepositPress = async () => {
    const response = await depositEth(Deposit)
    console.log(response)
    setDeposit(0)
  }

  const onWithdrawPress = async () => {
    const response = await withdrawETH(Withdraw)
    console.log(response)
    setWithdraw(0)
  }

  const onCheckBalacePress = async () => {
    const response = await checkBalance()
    setBalance(response)
  }

  const onCheckPoolPress = async () => {
    const response = await checkPool()
    setPool(response)
  }

  return (
    <div>
      <ConnetBtn setStatus={setStatus} />
      <div className="container mt-3 pt-3">
        <Row xs={1} md={2}>
          <Col style={{ textAlign: 'center', padding: '10', margin: '10' }}>
            <h3>Amount Deposit</h3>
            <Form style={{ padding: '10px', marginTop: '20px' }}>
              <Form.Group className="mb-3 pt-3">
                <Form.Label>Deposit Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={Deposit}
                  placeholder="Enter the amount you wish to deposit in ETH"
                  onChange={(e) => setDeposit(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={onDepositPress}>
                Deposit
              </Button>
            </Form>
          </Col>
          <Col style={{ textAlign: 'center', padding: '10', margin: '10' }}>
            <h3>Amount Withdrawal</h3>
            <Form style={{ padding: '10px', marginTop: '20px' }}>
              <Form.Group className="mb-3 pt-3">
                <Form.Label>Withdrawal Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={Withdraw}
                  placeholder="Enter the amount you wish to withdraw in ETH"
                  onChange={(e) => setWithdraw(e.target.value)}
                />
              </Form.Group>
              <Button variant="danger" onClick={onWithdrawPress}>
                Withdraw
              </Button>
            </Form>
          </Col>
        </Row>
        <Row xs={1} md={2} className="mb-3 pt-3">
          <Col>
            <Button
              variant="primary"
              type="submit"
              size="md"
              onClick={onCheckBalacePress}
            >
              View Account Balance
            </Button>
          </Col>
          <Col>
            <div id="balance">{Balance + 'ETH'}</div>
          </Col>
        </Row>
        <Row xs={1} md={2} className="mb-3 pt-3">
          <Col>
            <Button variant="primary" size="md" onClick={onCheckPoolPress}>
              View Cashpool
            </Button>
          </Col>
          <Col>
            <div id="cashpool">{Pool + ' ETH'}</div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Bank
