import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { InstrumentCardView } from '../ui/instrumentsViews';
import { useInstrumentContext } from '../utils/instrumentContext';
import { OutputCardView } from '../ui/outputViews';
import { EffectsTabView } from '../ui/effectsViews';
import { VoicingTabView } from '../ui/voicing';
import { DesignCardsView } from '../ui/designViews';
import { NoteEffectsTabView } from '../ui/noteEffectsViews';
import { versionIsSupported } from '../utils/util';

export const CurrentInstrumentPage = () => {
    const [ctx, reducer] = useInstrumentContext();
    return (
        <>
            <InstrumentCardView instrument={ctx.currentPreset} dispatch={reducer} />
            <Tabs defaultActiveKey="output" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="output" title="Piano">
                    <OutputCardView />
                </Tab>
                {ctx.instrumentParameters.hammerHardnessPiano && (
                    <Tab eventKey="voicing" title="Voicing" >
                        <VoicingTabView />
                    </Tab>
                )}
                {ctx.instrumentParameters.sbImpedance && (
                    <Tab eventKey="design" title="Design" >
                        <DesignCardsView />
                    </Tab>
                )}
                <Tab eventKey="effects" title="Effects" >
                    <EffectsTabView />
                </Tab>
                {
                    versionIsSupported("8.0.0", ctx.ptqInfo.version) && (
                        < Tab eventKey="noteEffects" title="Note effects" >
                            <NoteEffectsTabView />
                        </Tab>
                    )
                }
            </Tabs>
        </>
    );
}