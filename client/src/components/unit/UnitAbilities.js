import React, { useContext } from 'react';
import images from '../../constants/images';
import FftbgContext from '../../contexts/FftbgContext';

function Ability({
    name,
    slot,
}) {
    const abilityNameDisplay = name.length > 0 ? name : '(none)';

    return (
        <div className='d-inline-flex align-items-center'>
            <img className='ability-icon' src={`${images.icons}/${slot}.png`} alt={slot} />
            <div>{abilityNameDisplay}</div>
        </div>
    )
}

function NonInnates({
    mainActive,
    subActive,
    react,
    support,
    move,
}) {
    return (
        <>
            <Ability name={mainActive.name} slot='active' />
            <Ability name={subActive.name} slot='active' />
            <Ability name={react.name} slot='react' />
            <Ability name={support.name} slot='support' />
            <Ability name={move.name} slot='move' />
        </>
    );
}

export default function UnitAbilities(props) {
    const { data: { classes } } = useContext(FftbgContext);
    const { innates } = classes[props.unitClass][props.gender];

    const innatesChildren = (() => {
        if (!innates) { 
            return [];
        } else if (innates.length === 0) {
            return [];
        }  else {
            return innates
                .filter(({ type }) => type !== 'active')
                .map(({ name, type }) => (
                    <Ability key={name} name={name} slot={type} />
                ));
        }
    })();

    return (
        <div className='d-flex flex-column unit-abilities'>
            {props.gender !== 'Monster' && <NonInnates {...props} />}
            {innatesChildren.length > 0 && <div className='font-weight-bold'>Innates:</div>}
            {innatesChildren.length > 0 && innatesChildren}
        </div>
    );
}