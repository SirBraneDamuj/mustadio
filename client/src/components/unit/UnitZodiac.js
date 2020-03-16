import React from 'react';
import MustadioTooltip from '../util/MustadioTooltip';
import { compareZodiac, zodiacInfo } from '../../constants/zodiac';
import images from '../../constants/images';

export default function UnitZodiac({
    myZodiac,
    myGender,
    others,
    word,
}) {
    const starComponents = others.map(({ zodiac: otherZodiac, gender: otherGender }, index) => {
        const stars = compareZodiac(
            myZodiac, myGender, otherZodiac, otherGender
        );
        return (
            <img key={index} className='compat-icon' src={`${images.zodiac}/${stars}star.png`} alt={`${stars} stars`} />
        );
    });
    return (
        <MustadioTooltip side={'right'} content={zodiacInfo(word)}>
            <div className='d-flex flex-column justify-content-center'>
                {starComponents}
            </div>
        </MustadioTooltip>
    );
}