import classnames from 'classnames';
import images from '../../constants/images';
import type { Gender, Side } from '../../schemas';
import './UnitPortrait.css';

interface UnitPortraitProps {
    job: string;
    gender: Gender;
    team: string;
    side: Side;
}

export default function UnitPortrait({ job, gender, team, side }: UnitPortraitProps) {
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
