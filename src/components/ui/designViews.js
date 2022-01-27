import React from "react";
import { Card } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RangeParameterViewController, RangeViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const DesignCardsView = () => {

    const [ctx, reducer] = useInstrumentContext();

    return (
        <>
            <Card className="mb-2">
                <Card.Header>Soundboard settings</Card.Header>
                <Card.Body>
                    <RangeParameterViewController label="Impedance" name="impedance" min={0.3} max={3} step={0.01} param={ctx.currentParameters[45]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Cutoff" name="cutoff" min={0.3} max={3} step={0.01} param={ctx.currentParameters[46]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Q factor" name="factor" min={0.2} max={5} step={0.01} param={ctx.currentParameters[47]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>String settings</Card.Header>
                <Card.Body>
                    <RangeParameterViewController label="String length" name="length" min={0.8} max={10} step={0.01} param={ctx.currentParameters[48]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Sympathetic raisonance" name="sympathetic" min={0} max={5} step={0.01} param={ctx.currentParameters[49]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Duplex scale" name="duplex" min={0} max={20} step={0.01} param={ctx.currentParameters[50]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </Card>
            <Card className="mb-2">
                <Card.Header>Blooming settings</Card.Header>
                <Card.Body>
                    <RangeParameterViewController label="Energy" name="energy" min={0} max={2} step={0.01} param={ctx.currentParameters[53]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Inertia" name="inertia" min={0.1} max={3} step={0.01} param={ctx.currentParameters[54]} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </Card>
        </>
    )
}