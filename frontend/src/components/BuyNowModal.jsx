import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';

function BuyNowModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buy Now
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>The Buy Now Price for the NFT is Rs. 40000.</h6>
        <h6>Are you sure, you want to buy the NFT?</h6>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="success">Confirm</Button>
        <Button variant="danger" onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BuyNowModal