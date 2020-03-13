import React from 'react';

export default function UnitActives({
    ability: {
        learned,
    },
}) {
    const learnedChildren = learned.sort().map(({ name }) => (
        <div key={name}>{name}</div>
    ));
    return (
        <div className='d-flex flex-column unit-actives'>
            {learnedChildren}
        </div>
    );
}