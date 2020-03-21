import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import FftbgContext from '../../contexts/FftbgContext';
import MapRenderer from './MapRenderer';

const mapNumbers = new Array(118).fill(0).map((_, index) => `MAP${(index + 1).toString().padStart(3, '0')}`);
mapNumbers.push('MAP125');

const badMaps = new Set([
  'MAP009',
  'MAP014',
  'MAP016',
  'MAP033',
  'MAP056',
  'MAP095',
  'MAP111',
  'MAP113',
  'MAP114',
]);


export default function RenderModal({ show, onHide }) {
    const { currentMap } = useContext(FftbgContext);
    const [renderedMap, setRenderedMap] = useState(`MAP${currentMap.padStart(3, '0')}`);
    const [normalMaterial, setNormalMaterial] = useState(badMaps.has(renderedMap));

    function handleMaterialCheckbox(event) {
        setNormalMaterial(event.target.checked);
    }

    function handleMapSelector(event) {
        const newMap = event.target.value;
        setRenderedMap(newMap);
        if (badMaps.has(newMap)) {
            setNormalMaterial(true);
        } else {
            setNormalMaterial(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide} size='lg'>
            <ModalDialog size='lg'>
                <Modal.Header closeButton>
                    <h1>Map Renderer</h1>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        LMB+Drag to rotate. RMB+Drag to pan. Scroll Wheel to scroll.<br/>
                        Not every map is perfect. Most textures are not perfect.<br/>
                        This is an experimental feature.
                    </p>
                    <MapRenderer mapNumber={renderedMap} normalMaterial={normalMaterial} />
                    <div>
                        <label htmlFor='map-select'>Choose a Map:</label>
                        <select id='map-select' defaultValue={renderedMap} onChange={handleMapSelector}>
                            {
                                mapNumbers.map((mapName) => (
                                    <option value={mapName} key={mapName}>
                                        {mapName}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor='map-material-checkbox'>Use Normal Material: </label> 
                        <input id='map-material-checkbox' type='checkbox' checked={normalMaterial} onChange={handleMaterialCheckbox} />
                    </div>
                </Modal.Body>
            </ModalDialog>
        </Modal>
    );
}