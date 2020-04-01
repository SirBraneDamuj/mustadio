import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ContactModal from './ContactModal';
import MatchupModal from './MatchupModal';
import LatestMatchButton from './LatestMatchButton';

function Header({
    useDarkTheme,
    handleDarkThemeToggle,
}) {
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
                    <NavDropdown title='Links'>
                        {navLink('API Docs', '/api/swagger')}
                        {navLink('Github', 'https://github.com/sirbranedamuj/mustadio')}
                        <Nav.Item>
                            <Nav.Link onClick={showContact}>Contact</Nav.Link>
                        </Nav.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <LatestMatchButton />
                </Nav>
                <Nav>
                    <Button
                        variant='outline-secondary'
                        className='ml-5 mr-5'
                        onClick={showMatchups}
                    >
                        Choose Matchup...
                    </Button>
                </Nav>
                <Nav>
                    <Button variant='outline-secondary' onClick={handleDarkThemeToggle}>
                        {useDarkTheme ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                </Nav>
            </Navbar>
            <ContactModal show={contactShouldShow} onHide={hideContact} />
            <MatchupModal show={matchupsShouldShow} onHide={hideMatchups} />
        </>
    );
}

export default Header;