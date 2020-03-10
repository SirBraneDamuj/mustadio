import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import RenderModal from './RenderModal';
import './MapPreview.css';

const mapImageBase = 'https://mustadio-images.s3.amazonaws.com/maps';

export default function MapPreview({ mapNumber }) {
    const [shouldShowRender, setShouldShowRender] = useState(false);
    const showRender = () => setShouldShowRender(true);
    const hideRender = () => setShouldShowRender(false);

    const images = [1, 2, 3, 4].map((index) => (
            <img
                key={`${mapNumber}/${index}`}
                className='map-preview'
                src={`${mapImageBase}/${mapNumber}_${index}.gif`}
                alt='Map images courtesty of https://ffthacktics.com'
            />
        )
    );

    return (
        <>
            <span className='map-preview-container'>
                {images}
                <Button
                    variant='outline-info'
                    className='render-button'
                    title='Ladies and Gentlemen, please put on your 3D glasses now.'
                    onClick={showRender}
                >
                    3D!
                </Button>
            </span>
            <RenderModal show={shouldShowRender} onHide={hideRender} />
        </>
    );
}