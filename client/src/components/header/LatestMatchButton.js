import React from 'react';
import { Link } from 'react-router-dom';

export default function LatestMatchButton() {
    return (
        <Link className='btn btn-primary ml-5 mr-5' to='/'>Latest Match</Link>
    );
}