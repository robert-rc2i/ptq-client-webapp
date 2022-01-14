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

export const MidiControlPannel = () => {
    return (
        <>
            <p>No feedback is provided by Pianoteq.  So, it is impossible to know if a recording is on or not.</p>
            <div className="mb-5 d-flex justify-content-center">
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.stopMidiRecord(); }}><strong><i class="lead bi bi-stop-circle"/></strong> Stop</Button>
                <Button className="me-3" onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.playMidi(); }}><strong><i class="lead bi bi-play-circle"/></strong> Play</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.rewindMidi(); }}><strong><i class="lead bi bi-skip-backward-circle"/></strong> Rewind</Button>
            </div>
            <div className="d-flex justify-content-around">
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.recordMidi(); }}><strong><i class="lead bi bi-record-circle"/></strong> Record</Button>
            </div>
        </>
    )
}