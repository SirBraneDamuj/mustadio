import React from 'react';
import classnames from 'classnames';
import images from '../../constants/images';
import './UnitPortrait.css';

export default function UnitPortrait({
    job,
    gender,
    team,
    side,
}) {
    const classes = classnames({
        'unit-portrait-left': side === 'left',
        'unit-portrait-right': side === 'right',
    });

    const teamString = team === 'champion' ? '' : `_${team.replace(/^\w/, c => c.toUpperCase())}`;
    const fileName = gender === 'Monster' ? job : (job + gender.charAt(0) + teamString);
    const url =`${images.units}/${fileName}.gif`;

    return (
        <img
            className={classes}
            src={url}
            alt={fileName}
        />
    );
}