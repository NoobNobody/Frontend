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
            <ReactNavbar.Brand href="/">
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
                    <Nav.Link href="/">Strona główna</Nav.Link>
                    <Nav.Link href="/offers">Oferty</Nav.Link>
                    <Nav.Link href="/analysis">Analizy</Nav.Link>
                    <Nav.Link href="/categories">Kategorie</Nav.Link>
                </Nav>
            </ReactNavbar.Collapse>
        </ReactNavbar>
    );
}

export default Navbar;
