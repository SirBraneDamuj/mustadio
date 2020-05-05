import React, { useContext } from 'react';
import FftbgContext from '../../contexts/FftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';
import UnitPortrait from './UnitPortrait';
import UnitZodiac from './UnitZodiac';
import BraveFaith from './BraveFaith';

export default function UnitBasic({
    unit: {
        name,
        gender,
        brave,
        faith,
        zodiac,
    },
    job,
    team,
    otherTeam,
    side,
}) {
    const { data: { classes } } = useContext(FftbgContext);
    const allyZodiac = (
        <UnitZodiac myZodiac={zodiac} myGender={gender} others={team.units} side={side} word={'allies'} />
    );
    const enemyZodiac = (
        <UnitZodiac myZodiac={zodiac} myGender={gender} others={otherTeam.units} side={side} word={'enemies'} />
    );
    const classRaw = classes[job] && classes[job][gender]?.raw;
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
