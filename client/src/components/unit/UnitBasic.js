import React from 'react';
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
    const allyZodiac = (
        <UnitZodiac myZodiac={zodiac} myGender={gender} others={team.units} side={side} word={'allies'} />
    );
    const enemyZodiac = (
        <UnitZodiac myZodiac={zodiac} myGender={gender} others={otherTeam.units} side={side} word={'enemies'} />
    );
    return (
        <div className='d-flex flex-column unit-basic'>
            <a title={name} href={`https://fftbg.bryanching.net/player/${name}`} target='_blank'>{name}</a>
            <span>{gender}</span>
            <BraveFaith brave={brave} faith={faith} />
            <div className='font-weight-bold'>{job}</div>
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
