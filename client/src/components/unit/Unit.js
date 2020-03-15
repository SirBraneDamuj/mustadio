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
    otherTeam,
}) {
    return (
        <div className='d-flex unit-row'>
            <UnitBasic unit={unit} job={unit.class.name} side={side} team={team} otherTeam={otherTeam} />
            <UnitStats stats={unit.stats} />
            <UnitEquipment equipmentList={unit.equipment} side={side} />
            <UnitAbilities {...unit.abilities} gender={unit.gender} unitClass={unit.class.name} side={side} />
            <UnitActives ability={unit.abilities.mainActive} side={side} />
            {unit.abilities.subActive.name !== '' && <UnitActives ability={unit.abilities.subActive} />}
        </div>
    );
}