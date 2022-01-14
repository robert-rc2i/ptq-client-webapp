import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { InstrumentCardView } from '../ui/instrumentsViews';
import { useInstrumentContext } from '../utils/instrumentContext';
import { MidiControlCardView } from '../ui/midiControlViews';
import { OutputCardView } from '../ui/outputViews';
import { EffectsTabView } from '../ui/effectsViews';
import { VoicingTabView } from '../ui/voicing';

export const CurrentInstrumentPage = () => {
    const [ctx, reducer] = useInstrumentContext();
    console.log("[CurrentInstrumentPage] Ctx:", ctx);
    return (
        <>
                <InstrumentCardView isPresetModified={ctx.isPresetModified} instrument={ctx.currentPreset} dispatch={reducer} />
                <ControlMenu />
        </>
    );
}

const ControlMenu = () => {
    return (
        <Tabs defaultActiveKey="midi" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="midi" title="Midi">
                <MidiControlCardView />
            </Tab>
            <Tab eventKey="output" title="Output">
                <OutputCardView />
            </Tab>
            <Tab eventKey="voicing" title="Voicing" >
                <VoicingTabView />
            </Tab>
            <Tab eventKey="effects" title="Effects" >
                <EffectsTabView />
            </Tab>
        </Tabs>
    );
}