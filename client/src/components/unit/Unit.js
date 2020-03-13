import React from 'react';
import UnitBasic from './UnitBasic';
import UnitStats from './UnitStats';
import UnitEquipment from './UnitEquipment';
import UnitAbilities from './UnitAbilities';
import UnitActives from './UnitActives';
import './Unit.css';

export default function Unit({
    side,
    unit,
    team,
}) {
    return (
        <div className='d-flex unit-row'>
            <UnitBasic unit={unit} job={unit.class.name} side={side} team={team.name} />
            <UnitStats stats={unit.stats} />
            <UnitEquipment equipmentList={unit.equipment} />
            <UnitAbilities {...unit.abilities} gender={unit.gender} unitClass={unit.class.name} />
            <UnitActives ability={unit.abilities.mainActive} />
            {unit.abilities.subActive.name !== '' && <UnitActives ability={unit.abilities.subActive} />}
        </div>
    );
}