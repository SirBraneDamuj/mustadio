import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';

function ContactModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <ModalDialog size='lg'>
                <Modal.Header closeButton>
                    <h1>Contact</h1>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Mustadio is open source, but primarily maintained and hosted by SirBraneDamuj<br/>
                        If you have any issues using the site or have feature requests, feel free to create issues on github.<br/>
                        You can also usually find me on the official FFTBG discord #development channel. Ping me @SirBraneDamuj#0001<br/>
                        If all else fails, you can email me zpthacker@gmail.com
                    </p>
                </Modal.Body>
            </ModalDialog>
        </Modal>
    );
}

export default ContactModal;