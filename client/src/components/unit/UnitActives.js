import React, { useContext } from 'react';
import FftbgContext from '../../contexts/FftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';

const tooltipSide = (side) => side === 'left' ? 'right' : 'left';

export default function UnitActives({
    ability: {
        learned,
    },
    side,
}) {
    const { data: { abilities } } = useContext(FftbgContext);
    const learnedChildren = learned.map(({ name }) => {
        const { info } = abilities[name] || {};
        if (info) {
            return (
                <MustadioTooltip key={name} side={tooltipSide(side)} content={info}>
                    <div>{name}</div>
                </MustadioTooltip>
            );
        } else {
            return (
                <div key={name}>{name}</div>
            );
        }
    });
    return (
        <div className='d-flex flex-column unit-actives'>
            {learnedChildren}
        </div>
    );
}