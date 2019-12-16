import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';

const ModalMessage = ({ error, show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Error Occurred</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error}!</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMessage;
