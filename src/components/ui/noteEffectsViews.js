import React, { useState } from "react";
import { Card } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";
import { RenderIfTrue } from "../utils/loading";

export const NoteEffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <div className="mb-5">
            <div className="mb-3">
                <RangeParameterViewController label="Attack envelope" name="nfxAttackEnvelope" min={0} max={10} step={.0001} param={ctx.instrumentParameters.nfxAttackEnvelope} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            </div>
            <ModulationView />
            <VibratoView />
            <TremoloView />
        </div>
    )
}

export const ModulationView = () => {
    const [ctx, reducer] = useInstrumentContext();
    const [viewBody, setViewBody] = useState(false);

    const cName = viewBody ? "bi bi-chevron-down" : "bi bi-chevron-up";
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
                <div>Modulation</div>
                <div onClick={(e) => setViewBody(!viewBody)} className="d-flex flex-grow-1 justify-content-end"><i className={cName} /></div>
            </Card.Header>
            <RenderIfTrue predicate={viewBody}>
                <Card.Body>
                    <RangeParameterViewController label="Rate(Hz)" name="nfxModulationRate" min={0} max={25} step={.01} param={ctx.instrumentParameters.nfxModulationRate} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Onset duration(s)" name="nfxModulationOnsetDuration" min={0} max={5} step={.01} param={ctx.instrumentParameters.nfxModulationOnsetDuration} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Shape" name="nfxModulationShape" min={0} max={2} step={.01} param={ctx.instrumentParameters.nfxModulationShape} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <NegativeRangeParameterViewController label="Skew" name="nfxModulationShapeSkew" min={-1} max={1} step={0.01} param={ctx.instrumentParameters.nfxModulationShapeSkew} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Phase" name="nfxModulationPhase" min={0} max={360} step={1} param={ctx.instrumentParameters.nfxModulationPhase} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <InputSwitch name="nfxModulationPhaseLocked" label="Phase lock" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.nfxModulationPhaseLocked.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.nfxModulationPhaseLocked, reducer) }} />
                </Card.Body>
            </RenderIfTrue>
        </Card >
    );
}

export const VibratoView = () => {
    const [ctx, reducer] = useInstrumentContext();
    const [viewBody, setViewBody] = useState(false);

    const cName = viewBody ? "bi bi-chevron-down" : "bi bi-chevron-up";
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
                <div>Vibrato</div>
                <div onClick={(e) => setViewBody(!viewBody)} className="d-flex flex-grow-1 justify-content-end"><i className={cName} /></div>
            </Card.Header>
            <RenderIfTrue predicate={viewBody}>
                <Card.Body>
                    <RangeParameterViewController label="Depth(%)" name="nfxVibratoDepth" min={0} max={100} step={1} param={ctx.instrumentParameters.nfxVibratoDepth} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <NegativeRangeParameterViewController label="Offset" name="nfxVibratoOffset" min={-1} max={1} step={0.01} param={ctx.instrumentParameters.nfxVibratoOffset} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </RenderIfTrue>
        </Card >
    );
}

export const TremoloView = () => {
    const [ctx, reducer] = useInstrumentContext();
    const [viewBody, setViewBody] = useState(false);

    const cName = viewBody ? "bi bi-chevron-down" : "bi bi-chevron-up";
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
                <div>Tremolo</div>
                <div onClick={(e) => setViewBody(!viewBody)} className="d-flex flex-grow-1 justify-content-end"><i className={cName} /></div>
            </Card.Header>
            <RenderIfTrue predicate={viewBody}>
                <Card.Body>
                    <RangeParameterViewController label="Depth(db)" name="nfxTremoloDepth" min={0} max={50} step={.01} param={ctx.instrumentParameters.nfxTremoloDepth} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Offset" name="nfxTremoloPhase" min={0} max={360} step={1} param={ctx.instrumentParameters.nfxTremoloPhase} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </RenderIfTrue>
        </Card >
    );
}