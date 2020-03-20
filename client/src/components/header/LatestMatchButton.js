import React, { useContext } from 'react';
import FftbgContext from '../../contexts/FftbgContext';
import Button from 'react-bootstrap/Button';

export default function LatestMatchButton() {
    const context = useContext(FftbgContext);
    function clickHandler() {
        context.loadLatestMatch();
    }
    return (
        <Button
            variant='primary'
            className='ml-5 mr-5'
            onClick={clickHandler}
        >
            Latest Match
        </Button>
    )
}