import React from 'react'
import { Button, Image, Row, Col, Form } from 'react-bootstrap'
import imgplaceholder from '../assets/image-placeholder.png'
import { mintNFT } from '../utils/mintNFT'

import { useState } from 'react'
import ConnectBtn from './ConnectBtn'

export default function CreateNft() {
  const [imgUri, setimgUri] = useState('')
  const [Img, setImg] = useState('')
  const [Name, setName] = useState('')
  const [Description, setDescription] = useState('')
  const [Status, setStatus] = useState('')

  const onImgUpload = (e) => {
    if (e.target.files[0] === undefined) {
      setimgUri(null)
      setImg(null)
    } else {
      setimgUri(URL.createObjectURL(e.target.files[0]))
      setImg(e.target.files[0])
    }
  }

  const onMintPressed = async () => {
    const ImgData = new FormData()
    ImgData.append('file', Img)
    console.log(ImgData)
    const response = await mintNFT(ImgData, Name, Description)
    console.log(response)
    setStatus(response)
  }

  return (
    <div>
      <Form style={{ padding: '15px', marginTop: '20px' }}>
        <Row xs={1} md={2}>
          <Col style={{ textAlign: 'center' }}>
            <Image
              src={imgUri ? imgUri : imgplaceholder}
              style={{ maxHeight: '300px' }}
              fluid
            ></Image>
            <Form.Group controlId="formFile" className="mb-3 pt-3">
              <Form.Control type="file" onChange={onImgUpload} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: Ghost Lost in Space"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={onMintPressed}>
              Mint NFT
            </Button>
            <div id="status">{Status}</div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
