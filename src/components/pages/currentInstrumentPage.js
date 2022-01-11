import React from 'react';
import { Container, Row, Tab, Tabs } from 'react-bootstrap';
import { InstrumentCardView } from '../ui/instrumentsViews';
import { useInstrumentContext } from '../utils/instrumentContext';
import { MidiControlCardView } from '../ui/midiControlViews';
import { OutputCardView } from '../ui/outputViews';
import { EffectsTabView } from '../ui/effectsViews';

export const CurrentInstrumentPage = () => {
    const [ctx, reducer] = useInstrumentContext();
    console.log("[CurrentInstrumentPage] Ctx:", ctx);
    return (
        <>
            <Row>
                <InstrumentCardView instrument={ctx.currentPreset} dispatch={reducer} />
            </Row>
            <Row>
                <ControlMenu />
            </Row>
        </>
    );
}

const ControlMenu = (props) => {
    return (
        <Tabs defaultActiveKey="midi" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="midi" title="Midi">
                <MidiControlCardView />
            </Tab>
            <Tab eventKey="output" title="Output">
                <OutputCardView />
            </Tab>
            <Tab eventKey="voicing" title="Voicing" >
                <p>Voicing controls here (Not implemented yet)</p>
            </Tab>
            <Tab eventKey="effects" title="Effects" >
                <EffectsTabView />
            </Tab>
        </Tabs>
    );
}