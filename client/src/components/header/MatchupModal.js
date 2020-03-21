import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import Button from 'react-bootstrap/Button';
import FftbgContext from '../../contexts/FftbgContext';
import teams from '../../constants/teams';

function MatchupModal({ show, onHide }) {
    const history = useHistory();
    const { tournament: { tournamentId } } = useContext(FftbgContext);
    const [leftTeam, setLeftTeam] = useState(teams[0]);
    const [rightTeam, setRightTeam] = useState(teams[0]);

    const handleTeamSelection = (side) => (e) => {
        const value = e.target.value;
        if (side === 'left') {
            setLeftTeam(value);
        } else {
            setRightTeam(value);
        }
    };

    function handleButton() {
        history.push(`/${tournamentId}/${leftTeam}/${rightTeam}`);
    }

    function teamSelector(id, side) {
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