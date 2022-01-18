import React, { useState } from "react";
import { Accordion, Button, Card, Form, ListGroup, Modal, Offcanvas } from "react-bootstrap";
import { getAcousticPianoClasses, getChromaticPercussionClasses, getDrumClasses, getElectricPianoClasses, listPresetsForBank, listInstrumentsForClass, listPresetsForInstruments } from "../domain/presets";
import { useInstrumentContext } from "../utils/instrumentContext";
import * as pqtApi from '../api/pqtApi';

export const InstrumentSelectionPaneView = ({ show, toggleFunction }) => {
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
                return (
                    <ListGroup.Item key={idx} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onSelected(); pqtApi.loadPreset({ name: preset.name, bank: preset.bank, dispatch: dispatch }); }}>{preset.name}</ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export const InstrumentCardView = ({ instrument, dispatch, isPresetModified = false }) => {

    if (instrument) {
        return (
            <Card className="mb-2">
                <Card.Header>
                    <div className="d-flex justify-content-between">
                        <div>Current instrument</div>
                        <div className="d-flex justify-content-between">
                            <SavePresetController />
                            <Button onClick={(e) => { e.preventDefault(); e.stopPropagation(); pqtApi.reloadInstrumentAndItsParameters(dispatch) }}><strong><i className="bi bi-arrow-counterclockwise"></i></strong></Button>
                        </div>
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
                <span><strong>{status}</strong> instrument, </span>
                <span><strong>Author: </strong>{instrument.author}</span>
            </>
        )
    }
}

export const SavePresetController = () => {
    const [ctx, reducer] = useInstrumentContext();

    return ctx.isPresetModified && (<SavePresetControlView preset={ctx.currentPreset} reducer={reducer} />);
}

export const SavePresetControlView = ({ preset = {}, reducer }) => {
    const [hasClicked, setHasClicked] = useState(false);

    const onSave = (name) => { setHasClicked(false); pqtApi.savePreset({ name: name, dispatch: reducer }) }

    return (
        <>
            {!hasClicked && (<Button className="me-2" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHasClicked(true); }}>Save</Button>)}
            {hasClicked && (<ModalSaveView presetName={preset.name} show={hasClicked} handleClose={() => setHasClicked(false)} handleSave={onSave} />)}
        </>

    );
}

export const ModalSaveView = ({ show, handleClose, handleSave, presetName = "Not set" }) => {
    const [pn, setPresetName] = useState(presetName)
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Save current preset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="pnId1">
                    <Form.Label>Preset name</Form.Label>
                    <Form.Control type="text" value={pn} placeholder={presetName} onChange={(e) => setPresetName(e.target.value)}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSave(pn)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );

}