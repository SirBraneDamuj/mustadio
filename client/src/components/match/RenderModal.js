import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';

function RenderModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
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
                    <div id='map-renderer-target'>
                        Renderer goes here
                    </div>
                </Modal.Body>
            </ModalDialog>
        </Modal>
    );
}

export default RenderModal;