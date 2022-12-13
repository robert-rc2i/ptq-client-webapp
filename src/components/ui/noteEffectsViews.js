import React from "react";
import { Accordion } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const NoteEffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <>
            <div className="mb-3 ms-4 me-4">
                <RangeParameterViewController label="Attack envelope" name="nfxAttackEnvelope" min={0} max={10} step={.0001} param={ctx.instrumentParameters.nfxAttackEnvelope} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            </div>
            <Accordion className="mb-5">
                <Accordion.Item eventKey="modulation">
                    <Accordion.Header>Modulation</Accordion.Header>
                    <Accordion.Body>
                        <ModulationView ctx={ctx} reducer={reducer} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="vibrato">
                    <Accordion.Header>Vibrato</Accordion.Header>
                    <Accordion.Body>
                        <VibratoView ctx={ctx} reducer={reducer} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="tremolo">
                    <Accordion.Header>Tremolo</Accordion.Header>
                    <Accordion.Body>
                        <TremoloView ctx={ctx} reducer={reducer} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export const ModulationView = ({ ctx, reducer }) => {
    return (
        <>
            <RangeParameterViewController label="Rate(Hz)" name="nfxModulationRate" min={0} max={25} step={.01} param={ctx.instrumentParameters.nfxModulationRate} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Onset duration(s)" name="nfxModulationOnsetDuration" min={0} max={5} step={.01} param={ctx.instrumentParameters.nfxModulationOnsetDuration} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <div className="mt-3">
                <RangeParameterViewController label="Shape" name="nfxModulationShape" min={0} max={2} step={.01} param={ctx.instrumentParameters.nfxModulationShape} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                <NegativeRangeParameterViewController label="Skew" name="nfxModulationShapeSkew" min={-1} max={1} step={0.01} param={ctx.instrumentParameters.nfxModulationShapeSkew} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            </div>
            <div className="mt-3">
                <RangeParameterViewController label="Phase" name="nfxModulationPhase" min={0} max={360} step={1} param={ctx.instrumentParameters.nfxModulationPhase} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                <InputSwitch name="nfxModulationPhaseLocked" label="Phase lock" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.nfxModulationPhaseLocked.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.nfxModulationPhaseLocked, reducer) }} />
            </div>
        </>
    );
}

export const VibratoView = ({ ctx, reducer }) => {
    return (
        <>
            <RangeParameterViewController label="Depth(%)" name="nfxVibratoDepth" min={0} max={100} step={1} param={ctx.instrumentParameters.nfxVibratoDepth} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Offset" name="nfxVibratoOffset" min={-1} max={1} step={0.01} param={ctx.instrumentParameters.nfxVibratoOffset} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
        </>
    );
}

export const TremoloView = ({ ctx, reducer }) => {
    return (
        <>
            <RangeParameterViewController label="Depth(db)" name="nfxTremoloDepth" min={0} max={50} step={.01} param={ctx.instrumentParameters.nfxTremoloDepth} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Offset" name="nfxTremoloPhase" min={0} max={360} step={1} param={ctx.instrumentParameters.nfxTremoloPhase} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
        </>
    );
}