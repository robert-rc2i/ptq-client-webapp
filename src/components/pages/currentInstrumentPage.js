import React from 'react';
import { Accordion, Button, Container, ListGroup, Row } from 'react-bootstrap';
import * as pqtApi from '../api/pqtApi';
import { listInstrumentsForCollection, listPresetsForInstruments } from '../domain/presets';
import { InstrumentCardView } from '../ui/instrumentsViews';
import { useInstrumentContext } from '../utils/instrumentContext';
import { MidiControlCardView } from '../ui/midiControlViews'; 

export const CurrentInstrumentPage = () => {
    const [ctx,] = useInstrumentContext();
    console.log("[CurrentInstrumentPage] Ctx:", ctx);
    return (
        <Container>
            <Row>
                <InstrumentCardView instrument={ctx.currentPreset} />
            </Row>
            <Row>
                <MidiControlCardView />
            </Row>
        </Container>
    );
}

export const AccordionForCollections = (props) => {
    const { allPresets } = props;
    return (
        <Accordion defaultActiveKey="0">
            {allPresets.collections && allPresets.collections.map((colName, idx) => {
                return (
                    <Accordion.Item eventKey={colName} key={colName} name={colName}>
                        <Accordion.Header>{colName}</Accordion.Header>
                        <Accordion.Body>
                            <AccordionForInstruments collectionName={colName} presets={allPresets.presets} />
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    );
}

export const AccordionForInstruments = (props) => {
    const { collectionName, presets } = props;
    return (
        <Accordion defaultActiveKey="0">
            {listInstrumentsForCollection(presets, collectionName).map((instrumentName, idx) => {
                return (
                    <Accordion.Item eventKey={instrumentName} key={instrumentName} name={instrumentName}>
                        <Accordion.Header>{instrumentName}</Accordion.Header>
                        <Accordion.Body>
                            <ListOfPresets name={instrumentName} presets={presets} />
                        </Accordion.Body>
                    </Accordion.Item>
                )
            })}
        </Accordion>
    );
}
const ListOfPresets = (props) => {
    const { name, presets } = props;
    const [, dispatch] = useInstrumentContext();
    return (
        <ListGroup>
            {listPresetsForInstruments(presets, name).map((preset, idx) => {
                return (
                    <ListGroup.Item key={idx} onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.loadPreset({name: preset.name, bank: preset.bank, dispatch: dispatch}); }}>{preset.name}</ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}