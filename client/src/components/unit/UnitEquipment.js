import React from 'react';

export default function UnitEquipment({
    equipmentList,
}) {
    const gearInfo = items[gear.name] || { name: gear.name, info: '', slot: '' };
    const clazz = notables.items.has(gear.name) ? 'notable' : '';
    return (
    // - const gearInfo = items[gear.name] || { name: gear.name, info: '', slot: '' };
    // - const clazz = notables.items.has(gear.name) ? 'notable' : '';
    // +tooltip(tooltipSide, gearInfo.info)
    //     .d-inline-flex.align-items-center
    //         img.ability-icon(src=`${imageUrlBase}/icons/${gearInfo.slot}.png`)
    //         img.gear-icon(src=`${imageUrlBase}/items/${gearInfo.name.replace(' ', '+')}.png`)
    //         span(class=clazz)= gearInfo.name
        <div className='d-flex flex-column'>

        </div>
    )
}