import React from 'react';
import classnames from 'classnames';

export default function BraveFaith({
    brave,
    faith,
}) {
    const bfClasses = (val) => classnames({
        notable: val < 50 || val > 70,
    });

    return (
        <div className='flex-grow'>
            <span className={bfClasses(brave)}>B: {brave}</span>
            <span> / </span>
            <span className={bfClasses(faith)}>F: {faith}</span>
        </div>
    );
}
