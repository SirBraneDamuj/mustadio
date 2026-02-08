import UnitBasic from './UnitBasic';
import UnitStats from './UnitStats';
import UnitEquipment from './UnitEquipment';
import UnitAbilities from './UnitAbilities';
import UnitActives from './UnitActives';
import { useFftbgContext } from '../../hooks/useFftbgContext';
import type { Unit as UnitType, Team, Side } from '../../schemas';
import './Unit.css';

interface UnitProps {
    side: Side;
    unit: UnitType;
    team: Team;
    otherTeam: Team;
}

export default function Unit({ side, unit, team, otherTeam }: UnitProps) {
    const { data: { monsterSkills } } = useFftbgContext();
    const mainActives = unit.gender === 'Monster' || (unit.abilities.mainActive?.learned && unit.abilities.mainActive.learned.length > 0 && unit.class.name !== 'Mime');
    const mainActivesList = unit.gender === 'Monster'
        ? (monsterSkills[unit.class.name] ?? [])
        : (unit.abilities.mainActive?.learned?.map(({ name }) => name) ?? []);
    const subActives = unit.abilities.subActive?.learned && unit.abilities.subActive.learned.length > 0;
    const equipment = unit.gender !== 'Monster';
    return (
        <div className='d-flex unit-row'>
            <UnitBasic unit={unit} job={unit.class.name} side={side} team={team} otherTeam={otherTeam} />
            <UnitStats stats={unit.stats} side={side} />
            {equipment && <UnitEquipment equipmentList={unit.equipment} side={side} />}
            <UnitAbilities abilities={unit.abilities} gender={unit.gender} unitClass={unit.class.name} side={side} />
            {mainActives && <UnitActives learned={mainActivesList} side={unit.gender === 'Monster' ? 'right' : side} />}
            {subActives && <UnitActives learned={unit.abilities.subActive!.learned.map(({ name }) => name)} side='right'/>}
        </div>
    );
}
