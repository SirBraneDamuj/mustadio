import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from '../ui';
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
        onHide();
    }

    function teamSelector(id: string, side: 'left' | 'right') {
        return (
            <select
                id={id}
                defaultValue={teams[0]}
                onChange={handleTeamSelection(side)}
                className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {teams.map((team) => (
                    <option value={team} key={team}>{team}</option>
                ))}
            </select>
        );
    }

    return (
        <Modal show={show} onHide={onHide} title="Tournament Navigation" size="lg">
            <div className="space-y-4">
                <div>
                    <label htmlFor='team-one-selector' className="text-gray-700">Left Team:</label>
                    {teamSelector('team-one-selector', 'left')}
                </div>
                <div>
                    <label htmlFor='team-two-selector' className="text-gray-700">Right Team:</label>
                    {teamSelector('team-two-selector', 'right')}
                </div>
                <Button onClick={handleButton}>Go!</Button>
            </div>
        </Modal>
    );
}

export default MatchupModal;
