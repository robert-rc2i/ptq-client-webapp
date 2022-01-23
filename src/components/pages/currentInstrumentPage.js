import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { InstrumentCardView } from '../ui/instrumentsViews';
import { useInstrumentContext } from '../utils/instrumentContext';
import { OutputCardView } from '../ui/outputViews';
import { EffectsTabView } from '../ui/effectsViews';
import { VoicingTabView } from '../ui/voicing';

export const CurrentInstrumentPage = () => {
    const [ctx, reducer] = useInstrumentContext();
    console.log("[CurrentInstrumentPage] Ctx:", ctx);
    return (
        <>
            <InstrumentCardView instrument={ctx.currentPreset} dispatch={reducer} />
            <Tabs defaultActiveKey="output" id="uncontrolled-tab-example" className="mb-3">
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
        </>
    );
}