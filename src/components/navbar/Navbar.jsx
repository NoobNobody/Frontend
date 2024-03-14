import React from 'react';
import Logo from '../../assets/Logo.webp';
import './navbar.css';
import Nav from 'react-bootstrap/Nav';
import { Navbar as ReactNavbar } from 'react-bootstrap';


function Navbar() {
    return (
        <ReactNavbar expand="lg" className="bg-body-tertiary">
            <ReactNavbar.Brand href="/" className="mx-4 d-flex align-items-center">
                <img
                    src={Logo}
                    width="70"
                    height="70"
                    className="d-inline-block"
                    alt="JobBuffer logo"
                />
                <span className="ms-2">JobBuffer</span>
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
