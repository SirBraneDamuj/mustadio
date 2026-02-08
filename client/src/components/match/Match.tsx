import Team from './Team';
import MapPreview from './MapPreview';
import { useFftbgContext } from '../../hooks/useFftbgContext';
import './Match.css';

export default function Match() {
    const context = useFftbgContext();
    const { team1, team2 } = context.match;
    return (
        <div className='p-3'>
            <div className='d-flex flex-column'>
                <h2>{context.tournament.tournamentId}</h2>
                <h2>{`${team1.name} vs ${team2.name}`}</h2>
                <MapPreview mapNumber={context.currentMap.number} mapTitle={context.currentMap.title} />
            </div>
            <div className='d-flex match-container mt-3'>
                <div className='align-self-start mr-1'>
                    <h2>{team1.name} team</h2>
                    <Team team={team1} side='left' otherTeam={team2} />
                </div>
                <div className='align-self-start'>
                    <h2>{team2.name} team</h2>
                    <Team team={team2} side='right' otherTeam={team1} />
                </div>
            </div>
        </div>
    )
}
