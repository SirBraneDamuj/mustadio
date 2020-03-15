import React from 'react';
import MustadioTooltip from '../util/MustadioTooltip';
import { compareZodiac, zodiacInfo } from '../../constants/zodiac';
import images from '../../constants/images';

const tooltipSide = (side) => side === 'left' ? 'right' : 'left';

export default function UnitZodiac({
    myZodiac,
    myGender,
    others,
    side,
    word,
}) {
    const starComponents = others.map(({ zodiac: otherZodiac, gender: otherGender }, index) => {
        const stars = compareZodiac(
            myZodiac, myGender, otherZodiac, otherGender
        );
        return (
            <img key={index} className='compat-icon' src={`${images.zodiac}/${stars}star.png`} />
        );
    });
    return (
        <MustadioTooltip side={tooltipSide(side)} content={zodiacInfo(word)}>
            <div className='d-flex flex-column justify-content-center'>
                {starComponents}
            </div>
        </MustadioTooltip>
    );
}