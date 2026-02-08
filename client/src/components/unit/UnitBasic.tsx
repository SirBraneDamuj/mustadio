import { useFftbgContext } from '../../hooks/useFftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';
import UnitPortrait from './UnitPortrait';
import UnitZodiac from './UnitZodiac';
import BraveFaith from './BraveFaith';
import type { Unit, Team, Side } from '../../schemas';

interface UnitBasicProps {
    unit: Unit;
    job: string;
    team: Team;
    otherTeam: Team;
    side: Side;
}

export default function UnitBasic({ unit, job, team, otherTeam, side }: UnitBasicProps) {
    const { name, gender, brave, faith, zodiac } = unit;
    const { data: { classes } } = useFftbgContext();
    const classData = classes[job]?.[gender];
    const classRaw = classData?.raw;

    const allyZodiacData = team.units.map(u => ({ zodiac: u.zodiac, gender: u.gender }));
    const enemyZodiacData = otherTeam.units.map(u => ({ zodiac: u.zodiac, gender: u.gender }));

    const allyZodiac = (
        <UnitZodiac myZodiac={zodiac} myGender={gender} others={allyZodiacData} word='allies' />
    );
    const enemyZodiac = (
        <UnitZodiac myZodiac={zodiac} myGender={gender} others={enemyZodiacData} word='enemies' />
    );

    return (
        <div className='d-flex flex-column unit-basic'>
            <a title={name} href={`https://fftbg.bryanching.net/player/${name}`} target='_blank' rel="noopener noreferrer">
                {name}
            </a>
            <span>{gender}</span>
            <BraveFaith brave={brave} faith={faith} />
            <MustadioTooltip side='right' content={classRaw || 'Class info unavailable'}>
                <div className='font-weight-bold'>{job}</div>
            </MustadioTooltip>
            <div>{zodiac}</div>
            <div className='d-flex'>
                {side === 'left' ? allyZodiac : enemyZodiac}
                <UnitPortrait
                    job={job}
                    gender={gender}
                    team={team.name}
                    side={side}
                />
                {side === 'left' ? enemyZodiac : allyZodiac}
            </div>
        </div>
    );
}
