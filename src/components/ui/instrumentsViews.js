import React, { useState } from "react";
import { Accordion, Button, Card, Collapse, Form, ListGroup, Modal } from "react-bootstrap";
import { listPresetsForBank, listInstrumentsForClass, listPresetsForInstruments } from "../domain/presets";
import { useInstrumentContext } from "../utils/instrumentContext";
import * as pqtApi from '../api/pqtApi';

export const InstrumentSelectionPaneView = ({ toggleFunction }) => {
    const [ctx] = useInstrumentContext();
    const instrumentItems = ctx.allInstruments.classes.map((c) => {
        return (
            <Accordion.Item key={c} eventKey={c}>
                <Accordion.Header>{c}</Accordion.Header>
                <Accordion.Body>
                    <AccordionInstrumentsForClass className={c} presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                </Accordion.Body>
            </Accordion.Item>
        );
    });

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>My presets</Accordion.Header>
                <Accordion.Body>
                    <AccordionInstrumentsForBank presets={ctx.allInstruments.presets} toggleView={toggleFunction} />
                </Accordion.Body>
            </Accordion.Item>
            {instrumentItems}
        </Accordion>
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
export const AccordionInstrumentsForClass = ({ className = "", presets, toggleView }) => {
    return (
        <Accordion defaultActiveKey="0">
            {listInstrumentsForClass(presets, className).map((instrumentName, idx) => {
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

export const InstrumentCardView = ({ instrument, dispatch }) => {
    const [show, setShow] = useState(false);
    const iconClassName = show ? "text-primary bi bi-chevron-double-up" : "text-primary bi bi-chevron-double-down";
    if (instrument) {
        return (
            <Card className="mb-2">
                <Card.Header>
                    <InstrumentNavigationsControlView reducer={dispatch} />
                </Card.Header>
                <Card.Body>
                    <Card.Title><div className="d-flex justify-content-between"><div>{instrument.name}</div><SavePresetController /></div></Card.Title>
                    <Card.Subtitle>{instrument.collection} <i onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShow(!show) }} className={iconClassName} /></Card.Subtitle>
                    <Collapse in={show}>
                        <Card.Text>{instrument.comment}<br /><InstrumentRegistrationView instrument={instrument} /></Card.Text>
                    </Collapse>
                </Card.Body>
            </Card>
        );
    }

    return null;
}

export const InstrumentNavigationsControlView = ({ reducer }) => {
    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <Button title="Load previous preset" className="m-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); pqtApi.loadPreviousPreset(reducer) }}><i className="bi bi-chevron-double-left" /></Button>
                    <Button title="Reload previously saved preset" className="m-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); pqtApi.reloadInstrumentAndItsParameters(reducer) }}><i className="bi bi-arrow-counterclockwise" /></Button>
                    <Button title="Load next preset" className="m-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); pqtApi.loadNextPreset(reducer) }}><i className="bi bi-chevron-double-right" /></Button>
                </div>
                <Button title="Switch A/B preset" className="m-1" onClick={(event) => { event.stopPropagation(); pqtApi.switchAB(reducer); }}><i className="bi bi-arrow-left-right"></i> A/B</Button>
            </div>
        </>
    );
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
                    <Form.Control type="text" value={pn} placeholder={presetName} onChange={(e) => setPresetName(e.target.value)} />
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