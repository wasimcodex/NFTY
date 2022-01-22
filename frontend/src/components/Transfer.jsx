import React from 'react'

import {
  Row,
  Col,
  Container,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap'

import imgplaceholder from '../assets/image-placeholder.png'

const Transfer = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Transfer</h2>
      <img
        style={{ alignContent: 'center', margin: 'auto', display: 'block' }}
        className="cardImg"
        src={imgplaceholder}
        alt="placeholder"
      />
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <InputGroup className="address-input">
              <FormControl
                placeholder="Enter Beneficiary Address Eg. 0x1234567..."
                type="text"
              />
              <InputGroup.Text>Address</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Button
          className="action-btn"
          variant="info"
          style={{ alignContent: 'center', margin: 'auto', display: 'block' }}
        >
          Transfer
        </Button>
      </Container>
    </div>
  )
}

export default Transfer
