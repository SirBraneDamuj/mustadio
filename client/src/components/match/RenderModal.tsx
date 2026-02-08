import { useState, ChangeEvent } from 'react';
import { Modal } from '../ui';
import { useFftbgContext } from '../../hooks/useFftbgContext';
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
  'MAP104',
  'MAP111',
  'MAP113',
  'MAP114',
]);

interface RenderModalProps {
    show: boolean;
    onHide: () => void;
}

export default function RenderModal({ show, onHide }: RenderModalProps) {
    const { currentMap } = useFftbgContext();
    const initialMap = `MAP${currentMap.number.padStart(3, '0')}`;
    const [renderedMap, setRenderedMap] = useState(initialMap);
    const [normalMaterial, setNormalMaterial] = useState(badMaps.has(initialMap));

    function handleMaterialCheckbox(event: ChangeEvent<HTMLInputElement>) {
        setNormalMaterial(event.target.checked);
    }

    function handleMapSelector(event: ChangeEvent<HTMLSelectElement>) {
        const newMap = event.target.value;
        setRenderedMap(newMap);
        if (badMaps.has(newMap)) {
            setNormalMaterial(true);
        } else {
            setNormalMaterial(false);
        }
    }

    return (
        <Modal show={show} onHide={onHide} title="Map Renderer" size="lg">
            <p className="text-gray-600 mb-4">
                LMB+Drag to rotate. RMB+Drag to pan. Scroll Wheel to scroll.<br/>
                Not every map is perfect. Most textures are not perfect.<br/>
                This is an experimental feature.
            </p>
            <MapRenderer mapNumber={renderedMap} normalMaterial={normalMaterial} />
            <div className="mt-4 space-y-2">
                <div>
                    <label htmlFor='map-select' className="text-gray-700">Choose a Map: </label>
                    <select
                        id='map-select'
                        defaultValue={renderedMap}
                        onChange={handleMapSelector}
                        className="ml-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {mapNumbers.map((mapName) => (
                            <option value={mapName} key={mapName}>
                                {mapName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor='map-material-checkbox' className="text-gray-700">Use Normal Material: </label>
                    <input
                        id='map-material-checkbox'
                        type='checkbox'
                        checked={normalMaterial}
                        onChange={handleMaterialCheckbox}
                        className="ml-2 h-4 w-4"
                    />
                </div>
            </div>
        </Modal>
    );
}
