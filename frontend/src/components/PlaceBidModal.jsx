import React from 'react';
import {
  Button,
  Modal,
  FormControl,
  InputGroup,
  Col,
  Form,
  Row,
} from 'react-bootstrap'

function PlaceBidModal(props) {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Place Bid
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="emi_amount">
        <Row>
          <Col>
            <Form.Label>
              Enter your bid amount
            </Form.Label>
          </Col>
          <Col>
            <InputGroup>
              <FormControl
                placeholder="Amount in INR"
                type="number"
              />
              <InputGroup.Text>INR</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <FormControl
                placeholder="Amount in ETH"
                type="number"
                readOnly
              />
              <InputGroup.Text>ETH</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success">Confirm</Button>
      <Button variant="danger" onClick={props.onHide}>Cancel</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default PlaceBidModal