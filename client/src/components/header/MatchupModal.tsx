import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import Button from 'react-bootstrap/Button';
import { useFftbgContext } from '../../hooks/useFftbgContext';
import teams from '../../constants/teams';

interface MatchupModalProps {
    show: boolean;
    onHide: () => void;
}

function MatchupModal({ show, onHide }: MatchupModalProps) {
    const navigate = useNavigate();
    const { tournament: { tournamentId } } = useFftbgContext();
    const [leftTeam, setLeftTeam] = useState(teams[0]);
    const [rightTeam, setRightTeam] = useState(teams[0]);

    const handleTeamSelection = (side: 'left' | 'right') => (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (side === 'left') {
            setLeftTeam(value);
        } else {
            setRightTeam(value);
        }
    };

    function handleButton() {
        navigate(`/${tournamentId}/${leftTeam}/${rightTeam}`);
    }

    function teamSelector(id: string, side: 'left' | 'right') {
        return (
            <select id={id} defaultValue={teams[0]} onChange={handleTeamSelection(side)}>
                {
                    teams.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))
                }
            </select>
        );
    }

    return (
        <Modal show={show} onHide={onHide}>
            <ModalDialog size='lg'>
                <Modal.Header closeButton>
                    <h1>Tournament Navigation</h1>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor='team-one-selector'>Left Team: </label>
                    {teamSelector('team-one-selector', 'left')}
                    <br />
                    <label htmlFor='team-two-selector'>Right Team: </label>
                    {teamSelector('team-two-selector', 'right')}
                    <br />
                    <Button variant='primary' onClick={handleButton}>Go!</Button>
                </Modal.Body>
            </ModalDialog>
        </Modal>
    );
}

export default MatchupModal;
