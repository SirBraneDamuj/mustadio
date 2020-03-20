import React, { useEffect, useContext, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import FftbgContext from '../../contexts/FftbgContext';

const width = 640;
const height = 480;

function RenderModal({ show, onHide }) {
    const { renderedMap } = useContext(FftbgContext);
    const [normalMaterial, setNormalMaterial] = useState(false);
    const renderTarget = useRef(null);

    const myScene = useRef(null);
    const camera = useRef(null);
    const loader = useRef(null);
    const controls = useRef(null);
    const animationId = useRef(null);
    const renderer = useRef(null);

    function animate() {
        animationId.current = requestAnimationFrame(animate);
        renderer.current.render(myScene.current, camera.current);
    }

    function unloadMap() {
        cancelAnimationFrame(animationId.current);
        myScene.current.remove.apply(myScene.current, myScene.current.children);
    }

    useEffect(() => {
        myScene.current = new THREE.Scene();
        window.scene = myScene.current;
        camera.current = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
        window.camera = camera.current;
        camera.current.zoom = 75;
        camera.current.position.set(-2.5, 1.5, -2.0);
        camera.current.rotation.set(-2.5, -1, -2.5);
        camera.current.updateProjectionMatrix();
        renderer.current = new THREE.WebGLRenderer({ alpha: true });
        renderer.current.setSize(width, height);
        renderer.current.outputEncoding = THREE.GammaEncoding;
        renderer.current.setClearColor(0xffffff, 1);
        renderer.current.gammaFactor = 2.2;
        loader.current = new GLTFLoader();
    }, []);

    useEffect(() => {
        if(renderTarget.current) {
            renderTarget.current.append(renderer.current.domElement);
            controls.current = new OrbitControls(camera.current, renderTarget.current);
        }
    }, [show])

    useEffect(() => {
        if (show) {
            unloadMap();
            loader.current.load(`https://mustadio-maps.s3.amazonaws.com/${renderedMap}/${renderedMap}.gltf`, (result) => {
                myScene.current.add.apply(myScene.current, result.scene.children);
                let [skirt, terrain] = myScene.current.children;
                if (!terrain) {
                    terrain = skirt; // some maps use a single mesh called "tex"
                    skirt = undefined;
                } else {
                    skirt.material.color = new THREE.Color('black');
                    skirt.scale.x = -1;
                }
                terrain.scale.x = -1;
                if (renderedMap === 'MAP033') {
                    myScene.current.remove(skirt);
                }

                if (normalMaterial) {
                    terrain.material = new THREE.MeshNormalMaterial();
                }

                controls.current.target = terrain.position.clone();

                const box = new THREE.Box3().setFromObject(terrain);
                const center = box.getCenter(new THREE.Vector3());
                if (skirt) {
                    skirt.position.x += (skirt.position.x - center.x);
                    skirt.position.y += (skirt.position.y - center.y);
                    skirt.position.z += (skirt.position.z - center.z);
                }
                terrain.position.x += (terrain.position.x - center.x);
                terrain.position.y += (terrain.position.y - center.y);
                terrain.position.z += (terrain.position.z - center.z);
                controls.current.update();
                animate();
            });
        }
    }, [show, normalMaterial]);

    function handleMaterialCheckbox(event) {
        setNormalMaterial(event.target.checked);
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
                    <div id='map-renderer-target' ref={renderTarget} />
                    <div>
                        <label htmlFor='map-material-checkbox'>Use Normal Material: </label> 
                        <input id='map-material-checkbox' type='checkbox' onChange={handleMaterialCheckbox} />
                    </div>
                </Modal.Body>
            </ModalDialog>
        </Modal>
    );
}

export default RenderModal;