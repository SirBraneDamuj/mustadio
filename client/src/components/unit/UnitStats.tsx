import { useFftbgContext } from '../../hooks/useFftbgContext';
import { Ability } from './UnitAbilities';
import type { UnitStats as UnitStatsType, Side } from '../../schemas';

interface UnitStatsProps {
    side: Side;
    stats: UnitStatsType;
}

export default function UnitStats({ side, stats }: UnitStatsProps) {
    const { data: { statuses } } = useFftbgContext();
    const initialStatuses = stats.initialStatuses && [...new Set(stats.initialStatuses)].map((status) => (
        <Ability key={status} name={status} slot='status' info={statuses[status]?.info || ''} side={side} />
    ));
    const permStatuses = stats.permStatuses && [...new Set(stats.permStatuses)].map((status) => (
        <Ability key={status} name={status} slot='status' info={statuses[status]?.info || ''} side={side} />
    ));
    return (
        <div className='flex flex-col unit-stats'>
            <span>HP: {stats.hp} / MP: {stats.mp}</span>
            <span>Move: {stats.move} / Jump: {stats.jump}</span>
            <span>Speed: {stats.speed}</span>
            <span>PA: {stats.pa} / MA: {stats.ma}</span>
            <span>Evasion:</span>
            <span><span className="font-bold">C</span> {stats.cEvPercent}%</span>
            <span><span className="font-bold">S</span> {stats.sPhysEvPercent}% / {stats.sMagEvPercent}%</span>
            <span><span className="font-bold">A</span> {stats.aPhysEvPercent}% / {stats.aMagEvPercent}%</span>
            {initialStatuses && initialStatuses.length > 0 &&
                <>
                    <span className="font-bold">Initial Status:</span>
                    {initialStatuses}
                </>}
            {permStatuses && permStatuses.length > 0 &&
                <>
                    <span className="font-bold">Perm Status:</span>
                    {permStatuses}
                </>}
        </div>
    );
}
