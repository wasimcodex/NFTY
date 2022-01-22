import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, Image } from 'react-bootstrap'

import ConnectBtn from './ConnectBtn'

export default function CustomNav({ setStatus, setConnected, setWallet }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>NFTY</Navbar.Brand>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Link className="nav-link" to="/">
              Mint NFT
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/bank">
              Bank
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/profile">
              <ConnectBtn
                setStatus={setStatus}
                setConnected={setConnected}
                setWallet={setWallet}
              />
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}
