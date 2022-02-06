import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';
import { factoryMidiSequencerObject } from "../domain/midiSequencer";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RenderBasedOnApiVersion } from "../utils/loading";
import { versionIsSupported } from "../utils/util";

export const MidiControlerButtonView = () => {
    const [ctx] = useInstrumentContext(factoryMidiSequencerObject());
    const [hasClicked, setHasClicked] = useState(false);

    const onClose = (name) => { setHasClicked(!hasClicked); }
    const buttonVariant = ctx.midiState.is_playing || ctx.midiState.is_recording ? "info" : "primary"

    return (
        <>
            <Button title="Midi player" variant={buttonVariant} className="me-3 mb-2 px-3 py-0" onClick={onClose}><span><img alt="midi" src="/assets/midi.png" /></span></Button>
            {hasClicked && (<MidiControlCardView show={hasClicked} handleClose={onClose} />)}
        </>

    );
}

export const MidiControlCardView = ({ show = false, handleClose }) => {
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
    const [ctx, reducer] = useInstrumentContext(factoryMidiSequencerObject());

    //Do not pass a reducer, if not supported by the API, The initial API version did not support midi sequencer state
    const dispatch = versionIsSupported("7.5.3", ctx.ptqInfo.version) ? reducer : null;
    return (
        <>
            <RenderBasedOnApiVersion requiredVersion="7.5.3" currentVersion={ctx.ptqInfo.version} message={(<p>No feedback is provided by this current version of Pianoteq.  So, it is impossible to know if a recording is on or not.</p>)} />
            <div className="mb-5 d-flex justify-content-center">
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.stopMidiRecord(dispatch); }}><i className="lead bi bi-stop" /> Stop</Button>
                <Button className="me-3" variant={ctx.midiState.is_playing ? "info" : "primary"} onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.playMidi(dispatch); }}><i className="lead bi bi-play px-0 mx-0" /><i className="mx-0 px-0 lead bi bi-pause" /> Play</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.rewindMidi(dispatch); }}><i className="lead bi bi-skip-backward" /> Rewind</Button>
            </div>
            <div className="d-flex justify-content-around">
                <Button variant={ctx.midiState.is_recording ? "info" : "primary"} onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.recordMidi(dispatch); }}><i className="lead bi bi-record" /> Record</Button>
            </div>
        </>
    )
}