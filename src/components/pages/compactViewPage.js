import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useInstrumentContext } from '../utils/instrumentContext';

export const CompactViewPage = () => {
    const [ctx] = useInstrumentContext();

    const instrumentClassNames = ctx.allInstruments.classes.map((instrumentClassName) => {
        return (
            <Card className="ms-2 mb-2">
                <Card.Img variant="top" src={instrumentImagesMap.get(instrumentClassName)}/>
                <Card.Body>
                    <Card.Title>{instrumentClassName}</Card.Title>
                    <Button variant="outline-primary">Go</Button>
                </Card.Body>
            </Card>
        );
    });
    return (
        <>
            {instrumentClassNames}
        </>
    );
}

const instrumentImagesMap = new Map([
    ["Acoustic Piano", "/assets/instruments/piano.png"],
    ["Guitar", "/assets/instruments/classic-guitar.png"],
    ["Electric Piano", "/assets/instruments/electric-piano.png"],
    ["Guitar", "/assets/instruments/classic-guitar.png"],
    ["Chromatic Percussion", "/assets/instruments/digital-drum.png"],
    ["Historical Piano", "/assets/instruments/historical-piano.png"]
]);