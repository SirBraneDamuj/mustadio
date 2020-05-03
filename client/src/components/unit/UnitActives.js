import React, { useContext } from 'react';
import classnames from 'classnames';
import FftbgContext from '../../contexts/FftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';
import notables from '../../constants/notables';

const tooltipSide = (side) => side === 'left' ? 'right' : 'left';

export default function UnitActives({
    learned,
    side,
}) {
    const { data: { abilities } } = useContext(FftbgContext);
    const learnedChildren = learned?.map((name) => {
        const { info } = abilities[name.replace('*', '')] || {};
        const classNames = classnames({
            notable: notables.abilities.has(name),
        });
        if (info) {
            return (
                <MustadioTooltip key={name} side={tooltipSide(side)} content={info}>
                    <div className={classNames}>{name}</div>
                </MustadioTooltip>
            );
        } else {
            return (
                <div key={name}>{name}</div>
            );
        }
    });
    if (learnedChildren && learnedChildren.length > 0) {
        return (
            <div className='d-flex flex-column unit-actives'>
                {learnedChildren}
            </div>
        );
    } else {
        return null;
    }
}