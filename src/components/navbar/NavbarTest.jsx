import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { container, button, button2, button3, btnHamburguesa, containerNav, title, navCollapse } from "./NavbarTest.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import estilos from "./NavbarTest.module.css";
import logo from '/src/assets/logo.png'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const NavbarTest = () => {

  const signout = () => {
    
  }

  return (
    <Navbar expand="lg"  id={container} fixed='top'>
      <Container>
        <Navbar.Brand className='fw-bold text-white' id={title}>EncuestApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav text-white" id={btnHamburguesa}/>
        <Navbar.Collapse id="basic-navbar-nav" className={navCollapse}>
          <Nav className="gap-3" id={containerNav}>
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to='/' className='fw-bold text-decoration-none'>Go to home</Link>
              </Navbar.Text>
            </Button >
            <Button id={button2} size="sm">
              <Navbar.Text>
                <Link to='/login' className='fw-bold text-decoration-none'>Login</Link>
              </Navbar.Text>
            </Button>
            <Button id={button3} size="sm">
              <Navbar.Text>
                <Link to='/admin' className='fw-bold text-decoration-none'>Admin</Link>
              </Navbar.Text>
            </Button>
            <Button id={button3} size="sm">
              <Navbar.Text>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Navbar.Text>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}