import React from 'react';
import UnitPortrait from './UnitPortrait';
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
    side,
}) {
    return (
        <div className='d-flex flex-column unit-basic'>
            <a title={name} href={`https://fftbg.bryanching.net/player/${name}`}>{name}</a>
            <span>{gender}</span>
            <BraveFaith brave={brave} faith={faith} />
            <div className='font-weight-bold'>{job}</div>
            <div>{zodiac}</div>
            <UnitPortrait
                job={job}
                gender={gender}
                team={team}
                side={side}
            />
        </div>
    )
}
