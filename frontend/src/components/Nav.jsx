import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function CustomNav() {
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
            <Link className="nav-link" to="/mynfts">
              My NFTs
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}
