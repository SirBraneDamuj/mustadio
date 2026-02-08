import { useFftbgContext } from '../../hooks/useFftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';
import images from '../../constants/images';
import notables from '../../constants/notables';
import classnames from 'classnames';
import type { EquipmentItem, Side } from '../../schemas';

const tooltipSide = (side: Side): Side => side === 'left' ? 'right' : 'left';

interface EquipmentProps {
    name: string;
    slot: string;
    info?: string;
    side: Side;
}

function Equipment({ name, slot, info, side }: EquipmentProps) {
    const textClasses = classnames({
        notable: notables.items.has(name),
    });
    const line = (
        <div className='d-inline-flex align-items-center'>
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <img className='gear-icon' src={`${images.items}/${name.replace(' ', '+')}.png`} alt={name} />
            <span className={textClasses}>{name}</span>
        </div>
    );
    if (info) {
        return (
            <MustadioTooltip side={tooltipSide(side)} content={info}>
                {line}
            </MustadioTooltip>
        );
    } else {
        return line;
    }
}

interface UnitEquipmentProps {
    equipmentList: EquipmentItem[];
    side: Side;
}

export default function UnitEquipment({ equipmentList, side }: UnitEquipmentProps) {
    const { data: { items } } = useFftbgContext();
    const gear = equipmentList.map((equipment, index) => {
        const gearInfo = items[equipment.name] || { name: equipment.name, info: '', slot: '' };
        return (
            <Equipment
                key={index}
                name={gearInfo.name}
                slot={gearInfo.slot || ''}
                info={gearInfo.info}
                side={side}
            />
        );
    });
    return (
        <div className='d-flex flex-column unit-equipment'>
            {gear}
        </div>
    );
}
