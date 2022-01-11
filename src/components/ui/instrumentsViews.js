import React from "react";
import { Accordion, Button, Card, ListGroup, Offcanvas } from "react-bootstrap";
import { getAcousticPianoClasses, getChromaticPercussionClasses, getDrumClasses, getElectricPianoClasses, listPresetsForBank, listInstrumentsForClass, listPresetsForInstruments } from "../domain/presets";
import { useInstrumentContext } from "../utils/instrumentContext";
import * as pqtApi from '../api/pqtApi';

export const InstrumentSelectionPaneView = ({ show, classes, toggleFunction }) => {
    const [ctx] = useInstrumentContext();

    return (
        <Offcanvas show={show} onHide={toggleFunction}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Instrument selection</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>My presets</Accordion.Header>
                        <Accordion.Body>
                            <AccordionInstrumentsForBank presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Acoustic pianos</Accordion.Header>
                        <Accordion.Body>
                            <AccordionInstrumentsForClasses classNames={getAcousticPianoClasses()} presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Electric pianos</Accordion.Header>
                        <Accordion.Body>
                            <AccordionInstrumentsForClasses classNames={getElectricPianoClasses()} presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Chromatic percussions</Accordion.Header>
                        <Accordion.Body>
                            <AccordionInstrumentsForClasses classNames={getChromaticPercussionClasses()} presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Drums</Accordion.Header>
                        <Accordion.Body>
                            <AccordionInstrumentsForClasses classNames={getDrumClasses()} presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export const AccordionInstrumentsForBank = ({ bank = "My Presets", presets, toggleView }) => {
    const myPresets = listPresetsForBank(presets, bank);
    return (
        <ListOfPresetsView presets={myPresets} onSelected={toggleView} />
    );
}

/**
 * @TODO Need to parse all class names
 * @param {Array} classNames to look for
                * @param {Array} presets to search into
                * @returns the found instruments matching the provided class names
                */
export const AccordionInstrumentsForClasses = ({ classNames = [], presets, toggleView }) => {
    return (
        <Accordion defaultActiveKey="0">
            {listInstrumentsForClass(presets, classNames[0]).map((instrumentName, idx) => {
                return (
                    <Accordion.Item eventKey={instrumentName} key={instrumentName} name={instrumentName}>
                        <Accordion.Header>{instrumentName}</Accordion.Header>
                        <Accordion.Body>
                            <ListPresetsForInstrumentView name={instrumentName} presets={presets} onSelected={toggleView} />
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    );
}

const ListPresetsForInstrumentView = ({ name, presets, onSelected }) => {
    const [, dispatch] = useInstrumentContext();
    return (
        <ListGroup>
            {listPresetsForInstruments(presets, name).map((preset, idx) => {
                return (
                    <ListGroup.Item key={idx} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSelected(); pqtApi.loadPreset({ name: preset.name, bank: preset.bank, dispatch: dispatch }); }}>{preset.name}</ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

const ListOfPresetsView = ({ presets, onSelected }) => {
    const [, dispatch] = useInstrumentContext();
    return (
        <ListGroup>
            {presets.map((preset, idx) => {
                console.log("My Preset:", preset);
                return (
                    <ListGroup.Item key={idx} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSelected(); pqtApi.loadPreset({ name: preset.name, bank: preset.bank, dispatch: dispatch }); }}>{preset.name}</ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export const InstrumentCardView = ({ instrument, dispatch }) => {

    console.log("[InstrumentCardView] Instrument:", instrument);
    if (instrument) {
        return (
            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between">
                        <div>Current instrument</div>
                        <Button onClick={(e) => {e.preventDefault(); pqtApi.refreshContext(dispatch)}}>Reload</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{instrument.name}</Card.Title>
                    <Card.Subtitle>{instrument.collection}</Card.Subtitle>
                    <Card.Text>{instrument.comment}<br /><InstrumentRegistrationView instrument={instrument} /></Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return null;
}

export const InstrumentRegistrationView = ({ instrument }) => {
    if (instrument) {
        const status = instrument.license_status === "ok" ? "Registered" : "Demo"
        return (
            <>
                <span><strong>{status}</strong> instrument   , </span>
                <span><strong>Author: </strong>{instrument.author}</span>
            </>
        )
    }
}