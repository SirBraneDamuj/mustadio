import React from 'react';
import Unit from '../unit/Unit';
import './Team.css';

export default function Team({
    team,
    side,
}) {
    return (
        <div className='d-flex flex-column team-table'>
            {
                team.units.map((unit, index) => (
                    <div
                        key={`${team.name}/${index}`}
                    >
                        <Unit
                            unit={unit}
                            team={team}
                            side={side}
                        />
                    </div>
                ))
            }
        </div>
    )
}