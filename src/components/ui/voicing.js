import React from "react";
import { Card } from "react-bootstrap";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const VoicingTabView = () => {

    const [ctx, reducer] = useInstrumentContext();

    return (
        <>
            <Card className="mb-2">
                <Card.Header>Hammer settings</Card.Header>
                <Card.Body>
                    <RangeParameterViewController label="Piano dynamics" name="piano" min={0} max={2} step={0.1} param={ctx.instrumentParameters.hammerHardnessPiano} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Mezzo dynamics" name="mezo" min={0} max={2} step={0.1} param={ctx.instrumentParameters.hammerHardnessMezzo} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Forte dynamics" name="forte" min={0} max={2} step={0.1} param={ctx.instrumentParameters.hammerHardnessForte} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Hammer noise" name="hnoise" min={0.1} max={3} step={0.01} param={ctx.instrumentParameters.hammerNoise} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>Pedal settings</Card.Header>
                <Card.Body>
                    <RangeParameterViewController label="Soft pedal smoothing" name="softPedal" min={0} max={1} step={0.01} param={ctx.instrumentParameters.softPedalSmoothing} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </Card>
        </>
    )
}