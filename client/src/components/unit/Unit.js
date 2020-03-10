import React from 'react';
import UnitBasic from './UnitBasic';
import UnitStats from './UnitStats';
import './Unit.css';

export default function Unit({
    side,
    unit,
    team,
}) {
    return (
        <div className='d-flex unit-row'>
            <UnitBasic
                name={unit.name}
                gender={unit.gender}
                brave={unit.brave}
                faith={unit.faith}
                job={unit.class.name}
                zodiac={unit.zodiac}
                team={team.name}
                side={side}
            />
            <UnitStats stats={unit.stats} />
        </div>
    );
}