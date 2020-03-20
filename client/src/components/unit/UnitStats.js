import React, { useContext } from 'react';
import MustadioTooltip from '../util/MustadioTooltip';
import FftbgContext from '../../contexts/FftbgContext'

const tooltipSide = (side) => side === 'left' ? 'right' : 'left';

export default function UnitStats({ side, stats }) {
    const { data: { statuses } } = useContext(FftbgContext);
    const initialStatuses = stats.initialStatuses && stats.initialStatuses.map((status) => (
        <li key={status}>
            <MustadioTooltip side={tooltipSide(side)} content={statuses[status]?.info || ''}>
                <div>{status}</div>
            </MustadioTooltip>
        </li>
    ));
    const permStatuses = stats.permStatuses && stats.permStatuses.map((status) => (
        <li key={status}>
            <MustadioTooltip side={tooltipSide(side)} content={statuses[status]?.info || ''}>
                <div>{status}</div>
            </MustadioTooltip>
        </li>
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
                <>
                    <span>Initial:</span>
                    <ul>
                        {initialStatuses}
                    </ul>
                </>}
            {permStatuses && permStatuses.length > 0 && 
                <>
                    <span>Permanent:</span>
                    <ul>
                        {permStatuses}
                    </ul>
                </>}
        </div>
    );
}
