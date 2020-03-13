import React, { useContext } from 'react';
import FftbgContext from '../../contexts/FftbgContext';
import images from '../../constants/images';

function Equipment({
    name,
    slot
}) {
    return (
        <div className='d-inline-flex align-items-center'>
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <img className='gear-icon' src={`${images.items}/${name.replace(' ', '+')}.png`} alt={name} />
            <span>{name}</span>
        </div>
    );
}

export default function UnitEquipment({
    equipmentList,
}) {
    const { data: { items } } = useContext(FftbgContext);
    const gear = equipmentList.map(({ name }, index) => {
        const gearInfo = items[name] || { name, info: '', slot: '' };
        return (
            <Equipment {...gearInfo} key={index} />
        );
    });
    return (
        <div className='d-flex flex-column unit-equipment'>
            {gear}
        </div>
    );
}