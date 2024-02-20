import React from 'react';
import react from '../../assets/react.svg';
import './navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as ReactNavbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbar() {
    return (
        <ReactNavbar expand="lg" className="bg-body-tertiary">
            <ReactNavbar.Brand href="#home">
                <img
                    src={react}
                    width="30"
                    height="30"
                    className="d-inline-block align-top navbar__img"
                    alt="React Bootstrap logo"
                />{' '}
                Bufer Prac
            </ReactNavbar.Brand>
            <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactNavbar.Collapse id="basic-navbar-nav" className="navbar__right-menu">
                <Nav className="ms-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/oferty">Oferty</Nav.Link>
                    <Nav.Link href="/pracodawcy">Pracodawcy</Nav.Link>
                    <Nav.Link href="/kategorie">Kategorie</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </ReactNavbar.Collapse>
        </ReactNavbar>
    );
}

export default Navbar;
