import React from "react";
import { Card, Row } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RangeViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const VoicingTabView = () => {

    const [ctx, reducer] = useInstrumentContext();

    const piano = Parameters.getHammerHardnessPiano(ctx.currentParameters);
    const mezzo = Parameters.getHammerHardnessMezzo(ctx.currentParameters);
    const forte = Parameters.getHammerHardnessForte(ctx.currentParameters);
    const hammerNoise = Parameters.getHammerNoise(ctx.currentParameters);
    const softPedal = Parameters.getSoftPedalSmoothing(ctx.currentParameters);

    return (
        <Row>
            <Card className="mb-2">
                <Card.Header>Hammer settings</Card.Header>
                <Card.Body>
                    <RangeViewController label="Piano dynamics" name="piano" min={0} max={2} step={0.1} value={piano} paramIdx={27} dispatch={reducer} apiCallback={PtqApi.setHardnessForPiano} />
                    <RangeViewController label="Mezzo dynamics" name="mezo" min={0} max={2} step={0.1} value={mezzo} paramIdx={28} dispatch={reducer} apiCallback={PtqApi.setHardnessForMezzo} />
                    <RangeViewController label="Forte dynamics" name="forte" min={0} max={2} step={0.1} value={forte} paramIdx={29} dispatch={reducer} apiCallback={PtqApi.setHardnessForForte} />
                    <RangeViewController label="Hammer noise" name="hnoise" min={0.1} max={3} step={0.01} value={hammerNoise} paramIdx={5} dispatch={reducer} apiCallback={PtqApi.setHammerNoise} />
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>Pedal settings</Card.Header>
                <Card.Body>
                   
                    <RangeViewController label="Soft pedal smoothing" name="softPedal" min={0} max={1} step={0.01} value={softPedal} paramIdx={42} dispatch={reducer} apiCallback={PtqApi.setSoftPedalSmoothing} />
                </Card.Body>
            </Card>
        </Row>
    )
}