import React, { useContext } from 'react';
import MustadioTooltip from '../util/MustadioTooltip';
import images from '../../constants/images';
import FftbgContext from '../../contexts/FftbgContext';

const tooltipSide = (side) => side === 'left' ? 'right' : 'left';

function Ability({
    name,
    slot,
    info,
    side,
}) {
    const abilityNameDisplay = name.length > 0 ? name : '(none)';
    const line = (
        <div className='d-inline-flex align-items-center'>
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <div>{abilityNameDisplay}</div>
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

function NonInnates({
    mainActive,
    subActive,
    react,
    support,
    move,
    infoGetter,
    side,
}) {
    return (
        <>
            <Ability name={mainActive.name} slot='active' info={infoGetter(mainActive.name)} side={side} />
            <Ability name={subActive.name} slot='active' info={infoGetter(subActive.name)} side={side} />
            <Ability name={react.name} slot='react' info={infoGetter(react.name)} side={side} />
            <Ability name={support.name} slot='support' info={infoGetter(support.name)} side={side} />
            <Ability name={move.name} slot='move' info={infoGetter(move.name)} side={side} />
        </>
    );
}

export default function UnitAbilities(props) {
    const { data: { classes, abilities } } = useContext(FftbgContext);
    const { innates } = classes[props.unitClass][props.gender];
    const abilityInfoGetter = (name) => abilities[name]?.info;

    const innatesChildren = (() => {
        if (!innates) { 
            return [];
        } else if (innates.length === 0) {
            return [];
        }  else {
            return innates
                .filter(({ type }) => type !== 'active')
                .map(({ name, type }) => (
                    <Ability key={name} name={name} slot={type} info={abilityInfoGetter(name)} side={props.side} />
                ));
        }
    })();

    return (
        <div className='d-flex flex-column unit-abilities'>
            {props.gender !== 'Monster' && <NonInnates {...props} infoGetter={abilityInfoGetter} />}
            {innatesChildren.length > 0 && <div className='font-weight-bold'>Innates:</div>}
            {innatesChildren.length > 0 && innatesChildren}
        </div>
    );
}