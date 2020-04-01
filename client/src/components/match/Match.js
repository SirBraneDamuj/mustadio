import React, { useContext } from 'react';
import Team from './Team';
import MapPreview from './MapPreview';
import FftbgContext from '../../contexts/FftbgContext';

export default function Match() {
    const context = useContext(FftbgContext);
    const { team1, team2 } = context.match;
    if (!team1 || !team2) {
        return null;
    }
    return (
        <>
            <div className='d-flex flex-column'>
                <h2>{context.tournament.tournamentId}</h2>
                <h2>{`${team1.name} vs ${team2.name}`}</h2>
                {context.currentMap && <MapPreview mapNumber={context.currentMap} />}
            </div>
            <div className='d-flex flex-column flex-xl-row mt-3'>
                <div className='align-self-start mr-1'>
                    <h2>{team1.name} team</h2>
                    <Team team={team1} side='left' otherTeam={team2} />
                </div>
                <div className='align-self-start'>
                    <h2>{team2.name} team</h2>
                    <Team team={team2} side='right' otherTeam={team1} />
                </div>
            </div>
        </>
    )
}