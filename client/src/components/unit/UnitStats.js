import React from 'react';

export default function UnitStats({ stats }) {
    const initialStatuses = stats.initialStatuses && stats.initialStatuses.map((status) => (
        <li key={status}>{status}</li>
    ));
    const permStatuses = stats.permStatuses && stats.permStatuses.map((status) => (
        <li key={status}>{status}</li>
    ));
    return (
        <div className='d-flex flex-column unit-stats'>
            <span>HP: {stats.hp} / MP: {stats.mp}</span>
            <span>Speed: {stats.speed}</span>
            <span>Move: {stats.move} / Jump: {stats.jump}</span>
            <span>PA: {stats.pa} / MA: {stats.ma}</span>
            <span>Evasion:</span>
            <ul>
                <li>C-EV {stats.cEvPercent}%</li>
                <li>S-EV {stats.sPhysEvPercent}% / {stats.sMagEvPercent}%</li>
                <li>A-EV {stats.aPhysEvPercent}% / {stats.aMagEvPercent}%</li>
            </ul>
            {initialStatuses && initialStatuses.length > 0 && 
                <ul>
                    {initialStatuses}
                </ul>}
            {permStatuses && permStatuses.length > 0 && 
                <ul>
                    {permStatuses}
                </ul>}
        </div>
    );
}
