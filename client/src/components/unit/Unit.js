import React, { useContext } from 'react';
import UnitBasic from './UnitBasic';
import UnitStats from './UnitStats';
import UnitEquipment from './UnitEquipment';
import UnitAbilities from './UnitAbilities';
import UnitActives from './UnitActives';
import FftbgContext from '../../contexts/FftbgContext';
import './Unit.css';

export default function Unit({
    side,
    unit,
    team,
    otherTeam,
}) {
    const { data: { monsterSkills } } = useContext(FftbgContext);
    const mainActives = unit.gender === 'Monster' || (unit.abilities.mainActive?.learned?.length > 0 && unit.class.name !== 'Mime');
    const mainActivesList = unit.gender === 'Monster' ? monsterSkills[unit.class.name] : (unit.abilities.mainActive?.learned?.map(({ name }) => name) || []);
    const subActives = unit.abilities.subActive?.learned?.length > 0;
    const equipment = unit.gender !== 'Monster';
    return (
        <div className='d-flex unit-row'>
            <UnitBasic unit={unit} job={unit.class.name} side={side} team={team} otherTeam={otherTeam} />
            <UnitStats stats={unit.stats} side={side} />
            {equipment && <UnitEquipment equipmentList={unit.equipment} side={side} />}
            <UnitAbilities {...unit.abilities} gender={unit.gender} unitClass={unit.class.name} side={side} />
            {mainActives && <UnitActives learned={mainActivesList} side={side} />}
            {subActives && <UnitActives learned={unit.abilities.subActive.learned.map(({ name }) => name)} side={'left'}/>}
        </div>
    );
}