import Unit from '../unit/Unit';
import type { Team as TeamType, Side } from '../../schemas';

interface TeamProps {
    team: TeamType;
    otherTeam: TeamType;
    side: Side;
}

export default function Team({ team, otherTeam, side }: TeamProps) {
    return (
        <div className='flex flex-col team-table'>
            {team.units.map((unit, index) => (
                <Unit
                    key={`${team.name}/${index}`}
                    unit={unit}
                    team={team}
                    otherTeam={otherTeam}
                    side={side}
                />
            ))}
        </div>
    )
}
