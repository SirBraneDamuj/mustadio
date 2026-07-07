import { useFftbgContext } from '../../hooks/useFftbgContext';
import MustadioTooltip from '../util/MustadioTooltip';
import images from '../../constants/images';
import { useUserNotables } from '../../hooks/useUserNotables';
import type { EquipmentItem, Side } from '../../schemas';

const tooltipSide = (side: Side): Side => side === 'left' ? 'right' : 'left';

interface EquipmentProps {
    name: string;
    slot: string;
    info?: string;
    side: Side;
}

function Equipment({ name, slot, info, side }: EquipmentProps) {
    const { isNotable, toggleNotable } = useUserNotables();
    const isMarkedNotable = isNotable(name);
    const line = (
        <button
            type='button'
            className={`inline-flex items-center cursor-pointer border-0 bg-transparent p-0 text-inherit ${isMarkedNotable ? 'font-bold' : ''}`}
            onClick={() => toggleNotable(name)}
        >
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <img className='gear-icon' src={`${images.items}/${name.replace(' ', '+')}.png`} alt={name} />
            <span>{name}</span>
        </button>
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
        <div className='flex flex-col unit-equipment'>
            {gear}
        </div>
    );
}
