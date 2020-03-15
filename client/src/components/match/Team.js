import React from 'react';
import Unit from '../unit/Unit';
import './Team.css';

export default function Team({
    team,
    otherTeam,
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
                            otherTeam={otherTeam}
                            side={side}
                        />
                    </div>
                ))
            }
        </div>
    )
}