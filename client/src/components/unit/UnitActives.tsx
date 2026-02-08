import { useFftbgContext } from '../../hooks/useFftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';
import notables from '../../constants/notables';
import type { Side } from '../../schemas';

const tooltipSide = (side: Side): Side => side === 'left' ? 'right' : 'left';

interface UnitActivesProps {
    learned: string[];
    side: Side;
}

export default function UnitActives({ learned, side }: UnitActivesProps) {
    const { data: { abilities } } = useFftbgContext();
    const learnedChildren = learned?.map((name) => {
        const ability = abilities[name.replace('*', '')];
        const info = ability?.info;
        const isNotable = notables.abilities.has(name);
        if (info) {
            return (
                <MustadioTooltip key={name} side={tooltipSide(side)} content={info}>
                    <div className={isNotable ? 'font-bold' : ''}>{name}</div>
                </MustadioTooltip>
            );
        } else {
            return (
                <div key={name} className={isNotable ? 'font-bold' : ''}>{name}</div>
            );
        }
    });
    if (learnedChildren && learnedChildren.length > 0) {
        return (
            <div className='flex flex-col unit-actives'>
                {learnedChildren}
            </div>
        );
    } else {
        return null;
    }
}
