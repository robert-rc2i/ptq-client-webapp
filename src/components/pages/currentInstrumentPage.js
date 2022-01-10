import React from 'react';
import { Container, Row } from 'react-bootstrap';
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