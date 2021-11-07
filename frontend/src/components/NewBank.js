import React, { useState, useEffect } from 'react'
import ConnetBtn from './ConnectBtn'
import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap'
import {
  checkBalance,
  depositEth,
  withdrawETH,
  checkPool,
  currentExh,
} from '../utils/bankActions'

import { IoIosRefresh } from 'react-icons/io'

export const NewBank = () => {
  const [ShowDeposit, setShowDeposit] = useState(false)
  const [ShowWithdraw, setShowWithdraw] = useState(false)
  const [BalanceETH, setBalanceETH] = useState(0)
  const [BalanceINR, setBalanceINR] = useState(0)
  const [Status, setStatus] = useState('')
  const [DepositINR, setDepositINR] = useState(null)
  const [DepositETH, setDepositETH] = useState(0)
  const [WithdrawINR, setWithdrawINR] = useState(null)
  const [WithdrawETH, setWithdrawETH] = useState(0)

  var EXH

  useEffect(() => {
    const getBalance = async () => {
      const bal = await checkBalance()
      setBalanceETH(bal)
    }
    const getCurrentExh = async () => {
      EXH = await currentExh()
      setBalanceINR(BalanceETH * EXH)
    }
    getBalance()
    getCurrentExh()
  })

  const onClose = () => {
    setShowDeposit(false)
    setShowWithdraw(false)
  }

  const onShowDeposit = () => {
    setShowWithdraw(false)
    setShowDeposit(true)
  }

  const onShowWithdraw = () => {
    setShowDeposit(false)
    setShowWithdraw(true)
  }

  const onDepositChange = (e) => {
    setDepositINR(e.target.value)
    console.log('target ' + e.target.value)
    setDepositETH(e.target.value / EXH)
  }

  const onWithdrawChange = (e) => {
    setWithdrawINR(e.target.value)
    setWithdrawETH(e.target.value / EXH)
  }

  const onDeposit = async () => {
    const res = await depositEth(DepositETH)
    console.log(res)
    setDepositINR(0)
    setDepositETH(0)
    setShowDeposit(false)
  }

  const onWithdraw = async () => {
    const res = await withdrawETH(WithdrawETH)
    console.log(res)
    setWithdrawINR(0)
    setWithdrawETH(0)
    setShowWithdraw(false)
  }

  const onRefresh = async () => {
    const bal = await checkBalance()
    setBalanceINR(bal)
    setBalanceINR(BalanceETH * EXH)
  }

  return (
    <div>
      <ConnetBtn setStatus={setStatus} />
      <div style={{ padding: '50px' }}>
        <h1 style={{ textAlign: 'center' }}>
          Your Balance{' '}
          <IoIosRefresh
            style={{ fontSize: '22', cursor: 'pointer' }}
            onClick={onRefresh}
          />{' '}
        </h1>
        <h2 style={{ textAlign: 'center' }}>
          {parseFloat(BalanceETH).toFixed(4)} ETH
        </h2>
        <h4 style={{ textAlign: 'center' }}>
          {parseFloat(BalanceINR).toFixed(2)} INR
        </h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '20px',
            gap: '10px',
          }}
        >
          <Container>
            {!ShowDeposit && !ShowWithdraw ? (
              <Row style={{ marginBottom: '20px' }}>
                <Col style={{ textAlign: 'right', marginRight: '20px' }}>
                  <Button onClick={onShowDeposit}>Deposit</Button>
                </Col>
                <Col>
                  <Button onClick={onShowWithdraw}>Withdraw</Button>
                </Col>
              </Row>
            ) : (
              <>
                <Row style={{ marginBottom: '20px' }}>
                  <Col md={{ span: 4, offset: 4 }}>
                    <InputGroup className="mb-2">
                      <FormControl
                        placeholder={
                          ShowDeposit ? 'Deposit Amount' : 'Withdraw Amount'
                        }
                        type={'Number'}
                        value={ShowDeposit ? DepositINR : WithdrawINR}
                        onChange={
                          ShowDeposit ? onDepositChange : onWithdrawChange
                        }
                      />
                      <InputGroup.Text>INR </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-2" disable>
                      <FormControl
                        placeholder="ETH Equivalent"
                        readOnly
                        value={
                          ShowDeposit
                            ? parseFloat(DepositETH).toFixed(4)
                            : parseFloat(WithdrawETH).toFixed(4)
                        }
                      />
                      <InputGroup.Text>ETH</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                  <Col style={{ textAlign: 'right', marginRight: '20px' }}>
                    <Button onClick={ShowDeposit ? onDeposit : onWithdraw}>
                      {ShowDeposit && !ShowWithdraw ? 'Deposit' : 'Withdraw'}
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={onClose}>Close</Button>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}
