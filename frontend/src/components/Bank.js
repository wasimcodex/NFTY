import React from 'react';
import Nav from './Nav';
import { Button, Row, Col, Form } from 'react-bootstrap';

function Bank() {
  return (
    <div>
      <Nav></Nav>
      <div className="container mt-3 pt-3">
        <Row xs={1} md={2}>
          <Col style={{ textAlign: 'center', padding: '10', margin: '10' }}>
            <h3>Amount Deposit</h3>
            <Form style={{ padding: '10px', marginTop: '20px' }}>
              <Form.Group className="mb-3 pt-3">
                <Form.Label>Account address</Form.Label>
                <Form.Control type="text" placeholder="Enter your account address" />
              </Form.Group>
              <Form.Group className="mb-3 pt-3">
                <Form.Label>Deposit Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter the amount you wish to deposit" />
              </Form.Group>
              <Button variant="success" type="submit">
                Deposit
              </Button>
            </Form>
          </Col>
          <Col style={{ textAlign: 'center', padding: '10', margin: '10' }}>
          <h3>Amount Withdrawal</h3>
            <Form style={{ padding: '10px', marginTop: '20px' }}>
              <Form.Group className="mb-3 pt-3">
                <Form.Label>Account address</Form.Label>
                <Form.Control type="text" placeholder="Enter your account address" />
              </Form.Group>
              <Form.Group className="mb-3 pt-3">
                <Form.Label>Withdrawal Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter the amount you wish to withdraw" />
              </Form.Group>
              <Button variant="danger" type="submit">
                Withdraw
              </Button>
            </Form>
            </Col>
        </Row>
        <Row xs={1} md={2} className="mb-3 pt-3">
          <div>
            <Button variant="primary" type="submit" size="md">View Account Balance</Button>
            <div id="balance"></div>
          </div>
        </Row>
        <Row xs={1} md={2} className="mb-3 pt-3">
          <div>
            <Button variant="primary" type="submit" size="md">View Cashpool</Button>
            <div id="cashpool"></div>
          </div>
        </Row>
      </div>
    </div>
  )
}

export default Bank
