import { ReactNode } from 'react';
import MustadioTooltip from '../util/MustadioTooltip';
import images from '../../constants/images';
import { useFftbgContext } from '../../hooks/useFftbgContext';
import notables from '../../constants/notables';
import type { UnitAbilities as UnitAbilitiesType, Gender, Side } from '../../schemas';

const tooltipSide = (side: Side): Side => side === 'left' ? 'right' : 'left';

interface AbilityProps {
    name: string;
    slot: string;
    info?: string;
    side: Side;
    highlightNotables?: boolean;
}

export function Ability({ name, slot, info, side, highlightNotables = false }: AbilityProps) {
    const abilityNameDisplay = name && name.length > 0 ? name : '(none)';
    const isNotable = highlightNotables && notables.abilities.has(name);
    const line = (
        <div className='inline-flex items-center'>
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <div className={isNotable ? 'font-bold' : ''}>{abilityNameDisplay}</div>
        </div>
    );

    if (info) {
        return (
            <MustadioTooltip side={tooltipSide(side)} content={info}>
                {line}
            </MustadioTooltip>
        )
    } else {
        return line;
    }
}

interface NonInnatesProps {
    mainActive: { name: string };
    subActive: { name: string };
    react: { name: string };
    support: { name: string };
    move: { name: string };
    infoGetter: (name: string) => string | undefined;
    side: Side;
}

function NonInnates({ mainActive, subActive, react, support, move, infoGetter, side }: NonInnatesProps) {
    return (
        <>
            <Ability name={mainActive.name} slot='active' info={infoGetter(mainActive.name)} side={side} highlightNotables />
            <Ability name={subActive.name} slot='active' info={infoGetter(subActive.name)} side={side} highlightNotables />
            <Ability name={react.name} slot='react' info={infoGetter(react.name)} side={side} highlightNotables />
            <Ability name={support.name} slot='support' info={infoGetter(support.name)} side={side} highlightNotables />
            <Ability name={move.name} slot='move' info={infoGetter(move.name)} side={side} highlightNotables />
        </>
    );
}

interface UnitAbilitiesProps {
    abilities: Partial<UnitAbilitiesType>;
    gender: Gender;
    unitClass: string;
    side: Side;
}

export default function UnitAbilities({ abilities: unitAbilities, gender, unitClass, side }: UnitAbilitiesProps) {
    const { data: { classes, abilities } } = useFftbgContext();
    const classData = classes[unitClass]?.[gender];
    const innates = classData?.innates;
    const abilityInfoGetter = (name: string): string | undefined =>
        abilities[name]?.info || abilities[name?.replace(/ /g, '')]?.info;

    const innatesChildren: ReactNode[] = (() => {
        if (!innates || innates.length === 0) {
            return [];
        }
        return innates
            .filter((innate) => innate.type !== 'active')
            .map((innate) => (
                <Ability key={innate.name} name={innate.name} slot={innate.type || 'status'} info={abilityInfoGetter(innate.name)} side={side} />
            ));
    })();

    const hasNonInnates = gender !== 'Monster' &&
        unitAbilities.mainActive &&
        unitAbilities.subActive &&
        unitAbilities.react &&
        unitAbilities.support &&
        unitAbilities.move;

    return (
        <div className='flex flex-col unit-abilities'>
            {hasNonInnates && (
                <NonInnates
                    mainActive={unitAbilities.mainActive!}
                    subActive={unitAbilities.subActive!}
                    react={unitAbilities.react!}
                    support={unitAbilities.support!}
                    move={unitAbilities.move!}
                    infoGetter={abilityInfoGetter}
                    side={side}
                />
            )}
            {innatesChildren.length > 0 && <div className='font-bold'>Innates:</div>}
            {innatesChildren.length > 0 && innatesChildren}
        </div>
    );
}
