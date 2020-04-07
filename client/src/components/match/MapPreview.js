import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import RenderModal from './RenderModal';
import images from '../../constants/images';
import './MapPreview.css';

export default function MapPreview({ mapNumber, mapTitle }) {
    const [shouldShowRender, setShouldShowRender] = useState(false);
    const showRender = () => setShouldShowRender(true);
    const hideRender = () => setShouldShowRender(false);

    const imgs = [1, 2, 3, 4].map((index) => (
            <img
                key={`${mapNumber}/${index}`}
                className='map-preview'
                src={`${images.maps}/${mapNumber}_${index}.gif`}
                alt='Map images courtesy of https://ffthacktics.com'
            />
        )
    );

    return (
        <>
            <h3>
                <a href={`http://ffhacktics.com/maps.php?id=${mapNumber}`} target='_blank'>{`${mapNumber}) ${mapTitle}`}</a>
            </h3>
            <span className='map-preview-container'>
                {imgs}
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