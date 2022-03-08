import React from "react";
import { Accordion } from "react-bootstrap";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const DesignCardsView = () => {

    const [ctx, reducer] = useInstrumentContext();

    return (
        <Accordion className="mb-5" defaultActiveKey="sound">
            <Accordion.Item eventKey="sound">
                <Accordion.Header>Soundboard</Accordion.Header>
                <Accordion.Body>
                    <RangeParameterViewController label="Impedance" name="impedance" min={0.3} max={3} step={0.01} param={ctx.instrumentParameters.sbImpedance} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Cutoff" name="cutoff" min={0.3} max={3} step={0.01} param={ctx.instrumentParameters.sbCutoff} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Q factor" name="factor" min={0.2} max={5} step={0.01} param={ctx.instrumentParameters.sbQFactor} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="string">
                <Accordion.Header>String</Accordion.Header>
                <Accordion.Body>
                    <RangeParameterViewController label="String length" name="length" min={0.8} max={10} step={0.01} param={ctx.instrumentParameters.stringLength} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Sympathetic raisonance" name="sympathetic" min={0} max={5} step={0.01} param={ctx.instrumentParameters.sympatheticResonance} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Duplex scale" name="duplex" min={0} max={20} step={0.01} param={ctx.instrumentParameters.duplexScale} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="bloom">
                <Accordion.Header>Blooming</Accordion.Header>
                <Accordion.Body>
                    <RangeParameterViewController label="Energy" name="energy" min={0} max={2} step={0.01} param={ctx.instrumentParameters.bloomingEnergy} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Inertia" name="inertia" min={0.1} max={3} step={0.01} param={ctx.instrumentParameters.bloomingInertia} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}