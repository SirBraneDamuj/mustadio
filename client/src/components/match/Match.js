import React, { useContext } from 'react';
import Team from './Team';
import MapPreview from './MapPreview';
import FftbgContext from '../../contexts/FftbgContext';
import './Match.css';

export default function Match() {
    const context = useContext(FftbgContext);
    const { team1, team2 } = context.match;
    if (!team1 || !team2) {
        return null;
    }
    return (
        <>
            <h2>{`${team1.name} vs ${team2.name}`}</h2>
            <MapPreview mapNumber='1' />
            <div className='d-flex match-container mt-3'>
                <div className='align-self-start'>
                    <h2>{context.match.team1.name} team</h2>
                    <Team team={context.match.team1} side='left' />
                </div>
                <div className='align-self-start'>
                    <h2>{context.match.team2.name} team</h2>
                    <Team team={context.match.team2} side='right' />
                </div>
            </div>
        </>
    )
}