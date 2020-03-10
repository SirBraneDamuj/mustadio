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
            <h2>{`${team1.name} vs ${team2.name}`}</h2>
            <div className='mt-3'>
                <MapPreview mapNumber='1' />
            </div>
            <div className='d-flex mt-3'>
                <div className='flex-grow-1'>
                    <Team team={context.match.team1} side='left' />
                </div>
                <div className='flex-grow-1'>
                    <Team team={context.match.team2} side='right' />
                </div>
            </div>
        </>
    )
}