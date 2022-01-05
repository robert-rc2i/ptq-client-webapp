import React from "react";
import { Button, Card } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';

export const MidiControlCardView = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Midi controls</Card.Title>
                <Card.Subtitle>Controls Pianoteq Midi player</Card.Subtitle>
                <MidiControlPannel />
            </Card.Body>
        </Card>
    );
}

export const MidiControlPannel = () => {
    return (
        <div className="d-flex justify-content-around">
            <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.recordMidi(); }}>Record</Button>
            <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.stopMidiRecord(); }}>Stop</Button>
            <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.playMidi(); }}>Play</Button>
            <Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.rewindMidi(); }}>Rewind</Button>
        </div>
    )
}