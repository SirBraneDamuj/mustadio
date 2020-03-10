import React from 'react';
import UnitPortrait from './UnitPortrait';
import BraveFaith from './BraveFaith';

export default function UnitBasic({
    name,
    gender,
    brave,
    faith,
    job,
    zodiac,
    team,
    side,
}) {
    return (
        <div className='d-flex flex-column'>
            <a href={`https://fftbg.bryanching.net/player/${name}`}>{name}</a>
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
