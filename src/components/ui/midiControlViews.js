import React from "react";
import { Button, Card } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';

export const MidiControlCardView = () => {
    return (
        <Card>
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
            <div className="p-3 d-flex justify-content-around">
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.recordMidi(); }}>Record</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.stopMidiRecord(); }}>Stop</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.playMidi(); }}>Play</Button>
                <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.rewindMidi(); }}>Rewind</Button>
            </div>
        </>
    )
}