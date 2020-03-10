import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';

function MatchupModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <ModalDialog size='lg'>
                <Modal.Header closeButton>
                    <h1>Tournament Navigation</h1>
                </Modal.Header>
                <Modal.Body>
                    <h2>Round 1</h2>
                    <h2>Round 2</h2>
                    <h2>Round 3</h2>
                    <h2>Champion Round</h2>
                </Modal.Body>
            </ModalDialog>
        </Modal>
    );
}

export default MatchupModal;