import { Button, Image, Row, Col, Form } from 'react-bootstrap'
import Nav from './components/Nav'
import imgplaceholder from './assets/image-placeholder.png'
import { useEffect, useState } from 'react'
import { connectWallet, getCurrentWalletConnected } from './utils/connetWallet'
import { mintNFT } from './utils/mintNFT'

function App() {
  const [imgUri, setimgUri] = useState('')
  const [Img, setImg] = useState('')
  const [Name, setName] = useState('')
  const [Description, setDescription] = useState('')
  const [Status, setStatus] = useState('')
  const [walletAddress, setwalletAddress] = useState('')

  useEffect(() => {
    async function getWalletStatus() {
      const { address, status } = await getCurrentWalletConnected()
      setwalletAddress(address)
      setStatus(status)
    }
    getWalletStatus()
    walletListener()
  }, [])

  const onImgUpload = (e) => {
    if (e.target.files[0] === undefined) {
      setimgUri(null)
      setImg(null)
    } else {
      setimgUri(URL.createObjectURL(e.target.files[0]))
      setImg(e.target.files[0])
    }
  }

  const connetWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setwalletAddress(walletResponse.address)
  }

  const walletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setwalletAddress(accounts[0])
          setStatus('')
        } else {
          setwalletAddress('')
          setStatus('')
        }
      })
    } else {
      setwalletAddress('')
      setStatus('You must install Metamask, in your browser.')
    }
  }

  const onMintPressed = async () => {
    const ImgData = new FormData()
    ImgData.append('file', Img)
    console.log(ImgData)
    const response = await mintNFT(ImgData, Name, Description)
    console.log(response)
    setStatus(response.status)
  }

  return (
    <div>
      <Nav />
      <div className="text-center connect-btn">
        <button id="walletButton" onClick={connetWalletPressed}>
          {walletAddress.length > 0 ? (
            'Connected: ' +
            String(walletAddress).substring(0, 6) +
            '...' +
            String(walletAddress).substring(38)
          ) : (
            <span>connect Wallet</span>
          )}
        </button>
      </div>
      <Form style={{ padding: '10px', marginTop: '20px' }}>
        <Row xs={1} md={2}>
          <Col style={{ textAlign: 'center', padding: '10', margin: '10' }}>
            <Image
              src={imgUri ? imgUri : imgplaceholder}
              style={{ maxHeight: '400px' }}
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
              <Form.Label>Discription</Form.Label>
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

export default App
