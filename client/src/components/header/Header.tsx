import { useState } from 'react';
import { Button, Dropdown, DropdownItem } from '../ui';
import ContactModal from './ContactModal';
import MatchupModal from './MatchupModal';
import LatestMatchButton from './LatestMatchButton';

interface HeaderProps {
    useDarkTheme: boolean;
    handleDarkThemeToggle: () => void;
}

function Header({ useDarkTheme, handleDarkThemeToggle }: HeaderProps) {
    const [contactShouldShow, setContactShouldShow] = useState(false);
    const hideContact = () => setContactShouldShow(false);
    const showContact = () => setContactShouldShow(true);
    const [matchupsShouldShow, setMatchupsShouldShow] = useState(false);
    const hideMatchups = () => setMatchupsShouldShow(false);
    const showMatchups = () => setMatchupsShouldShow(true);

    return (
        <>
            <nav className="flex items-center gap-4 px-4 py-3 bg-gray-100 dark-theme:bg-zinc-800">
                <span className="text-xl font-semibold">Mustadio</span>

                <Dropdown trigger="Links">
                    <DropdownItem href="https://twitch.tv/fftbattleground">FFTBattleground</DropdownItem>
                    <DropdownItem href="/api/swagger">API Docs</DropdownItem>
                    <DropdownItem href="https://github.com/sirbranedamuj/mustadio">Github</DropdownItem>
                    <DropdownItem onClick={showContact}>Contact</DropdownItem>
                </Dropdown>

                <LatestMatchButton />

                <Button variant="outline" onClick={showMatchups} className="mx-4">
                    Choose Matchup...
                </Button>

                <Button variant="outline" onClick={handleDarkThemeToggle}>
                    {useDarkTheme ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </nav>
            <ContactModal show={contactShouldShow} onHide={hideContact} />
            <MatchupModal show={matchupsShouldShow} onHide={hideMatchups} />
        </>
    );
}

export default Header;
