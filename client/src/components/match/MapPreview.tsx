import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import RenderModal from './RenderModal';
import images from '../../constants/images';
import './MapPreview.css';

const customMaps = {
    0: 'Garmichael_End_Of_Time',
    118: 'Kokojo_Silas_Swamp',
    119: 'Kokojo_Tchechene_Bridge',
    120: 'ArmoredKori_Prison',
    121: 'ArmoredKori_Prison',
    122: 'ArmoredKori_Floating_Castle_Battleground',
    123: 'Garmichael_Mako_Reactor',
    124: 'ArmoredKori_Phantom_Train',
    126: 'Garmichael_Enhasa_Zeal_City',
    127: 'Garmichael_Arris_Dome',
};

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
    const wikiString = customMaps[mapNumber] || `MAP${mapNumber}`;

    return (
        <>
            <h3>
                <a href={`https://ffhacktics.com/wiki/${wikiString}`} target='_blank' rel='noopener noreferrer'>{`${mapNumber}) ${mapTitle}`}</a>
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
