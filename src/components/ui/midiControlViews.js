import React from "react";
import { Button, Card } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';

export const MidiControlCardView = () => {
    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Subtitle>Controls Pianoteq Midi player</Card.Subtitle>
                <MidiControlPannel />
            </Card.Body>
        </Card>
    );
}

const MidiControlPannel = () => {
    return (
        <>
            <p>No feedback is provided by Pianoteq.  So, it is impossible to know if a recording is on or not.</p>
            <div className="mb-5 d-flex justify-content-center">
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.stopMidiRecord(); }}><strong><i className="lead bi bi-stop-fill"/></strong> Stop</Button>
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.playMidi(); }}><strong><i className="lead bi bi-play-fill"/></strong> Play</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.rewindMidi(); }}><strong><i className="lead bi bi-skip-backward-fill"/></strong> Rewind</Button>
            </div>
            <div className="d-flex justify-content-around">
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.recordMidi(); }}><strong><i className="lead bi bi-record-fill"/></strong> Record</Button>
            </div>
        </>
    )
}