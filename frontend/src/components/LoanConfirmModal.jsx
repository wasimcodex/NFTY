import React from 'react';
import {
  Button,
  Modal,
  Col,
  Row,
  Card,
} from 'react-bootstrap';
import imagePlaceholder from '../assets/image-placeholder.png';
import eth from '../assets/eth.svg';

function LoanConfirmModal(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-60w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Loan Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '20px'}}>
          <Row>
            <Col lg={8} sm={12}>
              <p>You have applied for loan by providing <strong>XYZ</strong> NFT as a collateral with the following details:</p>
              <Row style={{ marginBottom: '1.125%'}}>
                <Col>Loan Amount</Col>
                <Col>
                  <div style={{ display: 'flex'}}>
                    <div>
                      <img
                          style={{ height: '20px', marginRight: '5px' }}
                          src={eth}
                        />
                      <strong>0.5</strong>
                    </div>
                    <div style={{ marginLeft: '10px', color: 'rgb(112, 122, 131)'}}>
                      (100000 INR)
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginBottom: '1.125%'}}>
                <Col>Duration</Col>
                <Col><strong>6 months</strong></Col>
              </Row>
              <Row style={{ marginBottom: '1.125%'}}>
                <Col>Interest Rate</Col>
                <Col><strong>12 p.c.p.a.</strong></Col>
              </Row>
              <Row>
                <Col>EMI per month</Col>
                <Col>
                  <div style={{ display: 'flex'}}>
                    <div>
                      <img
                          style={{ height: '20px', marginRight: '5px' }}
                          src={eth}
                      />
                      <strong>0.03</strong>
                    </div>
                    <div style={{ marginLeft: '10px', color: 'rgb(112, 122, 131)'}}>
                      (1000 INR)
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={4} sm={12}>
              <div className="sellOptions">
                <div>
                  <Card>
                    <Card.Img variant="bottom" src={imagePlaceholder} />
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Confirm</Button>
          <Button variant="danger" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoanConfirmModal