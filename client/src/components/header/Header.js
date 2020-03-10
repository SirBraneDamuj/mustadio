import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ContactModal from './ContactModal';
import MatchupModal from './MatchupModal';

function Header() {
    const [contactShouldShow, setContactShouldShow] = useState(false);
    const hideContact = () => setContactShouldShow(false);
    const showContact = () => setContactShouldShow(true);
    const [matchupsShouldShow, setMatchupsShouldShow] = useState(false);
    const hideMatchups = () => setMatchupsShouldShow(false);
    const showMatchups = () => setMatchupsShouldShow(true);

    const navLink = (text, href) => (
        <Nav.Item>
            <Nav.Link href={href}>{text}</Nav.Link>
        </Nav.Item>
    );
    return (
        <>
            <Navbar bg='light' expand='lg'>
                <Navbar.Brand>Mustadio</Navbar.Brand>
                <Nav>
                    {navLink('API Docs', '/api/swagger')}
                    {navLink('Github', 'https://github.com/sirbranedamuj/mustadio')}
                    <Nav.Item>
                        <Nav.Link onClick={showContact}>Contact</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Button
                    variant='outline-secondary'
                    className='ml-5 mr-5'
                    onClick={showMatchups}
                >
                    Choose Matchup...
                </Button>
                <Button variant='outline-secondary'>
                    Dark Mode
                </Button>
            </Navbar>
            <ContactModal show={contactShouldShow} onHide={hideContact} />
            <MatchupModal show={matchupsShouldShow} onHide={hideMatchups} />
        </>
    );
}

export default Header;