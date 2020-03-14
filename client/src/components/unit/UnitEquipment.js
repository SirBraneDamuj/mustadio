import React, { useContext } from 'react';
import MustadioTooltip from '../util/MustadioTooltip';
import FftbgContext from '../../contexts/FftbgContext';
import images from '../../constants/images';

const tooltipSide = (side) => side === 'left' ? 'right' : 'left';

function Equipment({
    name,
    slot,
    info,
    side,
}) {
    const line = (
        <div className='d-inline-flex align-items-center'>
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <img className='gear-icon' src={`${images.items}/${name.replace(' ', '+')}.png`} alt={name} />
            <span>{name}</span>
        </div>
    );
    if (info) {
        return (
            <MustadioTooltip side={tooltipSide(side)} content={info}>
                {line}
            </MustadioTooltip>
        );
    } else {
        return line;
    }
}

export default function UnitEquipment({
    equipmentList,
    side,
}) {
    const { data: { items } } = useContext(FftbgContext);
    const gear = equipmentList.map(({ name }, index) => {
        const gearInfo = items[name] || { name, info: '', slot: '' };
        return (
            <Equipment {...gearInfo} key={index} side={side} />
        );
    });
    return (
        <div className='d-flex flex-column unit-equipment'>
            {gear}
        </div>
    );
}