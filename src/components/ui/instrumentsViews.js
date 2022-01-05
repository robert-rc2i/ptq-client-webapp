import React from "react";
import { Accordion, Button, Card, ListGroup, Offcanvas } from "react-bootstrap";
import { listInstrumentsForClass, listPresetsForInstruments } from "../domain/presets";
import { useInstrumentContext } from "../utils/instrumentContext";
import * as pqtApi from '../api/pqtApi';

export const InstrumentSelectionPaneView = ({ show, classes, toggleFunction, instrumentName = "No value supplied" }) => {
    const [ctx] = useInstrumentContext();
    return (
        <Offcanvas show={show} onHide={toggleFunction}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{instrumentName}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <AccordionInstrumentsForClasses classNames={classes} presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
            </Offcanvas.Body>
        </Offcanvas>
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
                            <ListOfPresets name={instrumentName} presets={presets} onSelected={toggleView} />
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    );
}

const ListOfPresets = ({ name, presets, onSelected }) => {
    const [, dispatch] = useInstrumentContext();
    return (
        <ListGroup>
            {listPresetsForInstruments(presets, name).map((preset, idx) => {
                return (
                    <ListGroup.Item key={idx} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSelected(); pqtApi.loadPreset({name: preset.name, bank: preset.bank, dispatch: dispatch}); }}>{preset.name}</ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export const InstrumentCardView = ({ instrument }) => {
    const [, reducer] = useInstrumentContext();
    
    console.log("[InstrumentCardView] Instrument:", instrument);
    if (instrument) {
        return (
            <Card>
                <div className="d-flex justify-content-between">
                <div><h2>Current instrument</h2></div>
                <div><Button onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.switchAB(reducer); }}>A/B Switch</Button></div>
                </div>
                
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