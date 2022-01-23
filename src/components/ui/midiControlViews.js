import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';

export const MidiControlerButtonView = () => {
    const [hasClicked, setHasClicked] = useState(false);

    const onClose = (name) => { setHasClicked(!hasClicked); }

    return (
        <>
            <Button className="mx-2 mb-2 px-2 py-0" onTouchEnd={onClose} onClick={onClose}><span><i className="fs-2 bi bi-music-player" /></span></Button>
            {hasClicked && (<MidiControlCardView show={hasClicked} handleClose={onClose} />)}
        </>

    );
}

export const MidiControlCardView = ({show=false, handleClose}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Midi player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MidiControlPannel />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const MidiControlPannel = () => {
    return (
        <>
            <p>No feedback is provided by Pianoteq.  So, it is impossible to know if a recording is on or not.</p>
            <div className="mb-5 d-flex justify-content-center">
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.stopMidiRecord(); }}><strong><i className="lead bi bi-stop-fill" /></strong> Stop</Button>
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.playMidi(); }}><strong><i className="lead bi bi-play-fill" /></strong> Play</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.rewindMidi(); }}><strong><i className="lead bi bi-skip-backward-fill" /></strong> Rewind</Button>
            </div>
            <div className="d-flex justify-content-around">
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.recordMidi(); }}><strong><i className="lead bi bi-record-fill" /></strong> Record</Button>
            </div>
        </>
    )
}