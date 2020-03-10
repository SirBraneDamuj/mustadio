import React, { useContext } from 'react';
import FftbgContext from '../../contexts/FftbgContext'
import { Ability } from './UnitAbilities';

export default function UnitStats({ side, stats }) {
    const { data: { statuses } } = useContext(FftbgContext);
    const initialStatuses = stats.initialStatuses && [...new Set(stats.initialStatuses)].map((status) => (
        <Ability key={status} name={status} slot='status' info={statuses[status]?.info || ''} side={side} />
    ));
    const permStatuses = stats.permStatuses && [...new Set(stats.permStatuses)].map((status) => (
        <Ability key={status} name={status} slot='status' info={statuses[status]?.info || ''} side={side} />
    ));
    return (
        <div className='d-flex flex-column unit-stats'>
            <span>HP: {stats.hp} / MP: {stats.mp}</span>
            <span>Speed: {stats.speed}</span>
            <span>Move: {stats.move} / Jump: {stats.jump}</span>
            <span>PA: {stats.pa} / MA: {stats.ma}</span>
            <span>Evasion:</span>
            <span><strong>C</strong> {stats.cEvPercent}%</span>
            <span><strong>S</strong> {stats.sPhysEvPercent}% / {stats.sMagEvPercent}%</span>
            <span><strong>A</strong> {stats.aPhysEvPercent}% / {stats.aMagEvPercent}%</span>
            {initialStatuses && initialStatuses.length > 0 && 
                <>
                    <strong>Initial Status:</strong>
                    {initialStatuses}
                </>}
            {permStatuses && permStatuses.length > 0 && 
                <>
                    <strong>Perm Status:</strong>
                    {permStatuses}
                </>}
        </div>
    );
}
