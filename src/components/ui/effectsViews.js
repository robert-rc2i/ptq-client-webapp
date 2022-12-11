import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";
import { RenderIfTrue } from "../utils/loading";

export const EffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <div className="mb-5">
            <div className="mb-2">
                <NegativeRangeParameterViewController label="Post Effect Gain" name="fxGain" min={-12} max={12} step={0.2} param={ctx.instrumentParameters.postFxGain} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            </div>
            <Card className="mb-3">
                <Card.Header>Toggle effects</Card.Header>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-evenly mt-3">
                        <InputSwitch name="eq1" label="EQ #1" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.eq1.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.eq1, reducer) }} />
                        <InputSwitch name="eq2" label="EQ #2" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.eq2.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.eq2, reducer) }} />
                    </div>
                </Card.Body>
            </Card>
            <DelayView />
            <ReverbView />
        </div>
    )
}

export const DelayView = () => {
    const [ctx, reducer] = useInstrumentContext();
    const [viewBody, setViewBody] = useState(false);

    const delayOn = Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.delaySwitch.text);
    const swtichLabel = delayOn ? "Delay On" : "Delay Off";
    const cName = viewBody ? "bi bi-chevron-down" : "bi bi-chevron-up";
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
                <InputSwitch name="delaySwitch" label={swtichLabel} isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.delaySwitch.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.delaySwitch, reducer) }} />
                <div onClick={(e) => setViewBody(!viewBody)} className="d-flex flex-grow-1 justify-content-end"><i className={cName}/></div>
            </Card.Header>
            <RenderIfTrue predicate={viewBody}>
                <Card.Body>
                    <RangeParameterViewController label="Mix(%)" name="delayMix" min={0} max={100} step={1} param={ctx.instrumentParameters.delayMix} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Delay(ms)" name="delayTime" min={1} max={1000} step={1} param={ctx.instrumentParameters.delayTime} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Feedback(%)" name="delayFeedback" min={0} max={100} step={1} param={ctx.instrumentParameters.delayFeedback} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <NegativeRangeParameterViewController label="Tone" name="delayTone" min={-1} max={1} step={.01} param={ctx.instrumentParameters.delayTone} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </RenderIfTrue>
        </Card>
    );
}

export const ReverbView = () => {
    const [ctx, reducer] = useInstrumentContext();
    const [viewBody, setViewBody] = useState(false);

    const reverbOn = Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.reverbSwitch.text)
    const swtichLabel = reverbOn ? "Reverb On" : "Reverb Off";
    const cName = viewBody ? "bi bi-chevron-down" : "bi bi-chevron-up";
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex justify-content-between">
                <InputSwitch name="reverbSwitch" label={swtichLabel} isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.reverbSwitch.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.reverbSwitch, reducer) }} />
                <div onClick={(e) => setViewBody(!viewBody)} className="d-flex flex-grow-1 justify-content-end"><i className={cName}/></div>
            </Card.Header>
            <RenderIfTrue predicate={viewBody}>
                <Card.Body>
                    <NegativeRangeParameterViewController label="Mix(db)" name="reverbMix" min={-50} max={50} step={0.1} param={ctx.instrumentParameters.reverbMix} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Duration(s)" name="reverbDuration" min={0} max={5} step={.01} param={ctx.instrumentParameters.reverbDuration} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Room size(m)" name="reverbRoomDimensions" min={5} max={50} step={.01} param={ctx.instrumentParameters.reverbRoomDimensions} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Pre-delay(s)" name="reverbPreDelay" min={.0} max={.200} step={.001} param={ctx.instrumentParameters.reverbPreDelay} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <NegativeRangeParameterViewController label="Tone" name="reverbTone" min={-1} max={1} step={0.01} param={ctx.instrumentParameters.reverbTone} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <NegativeRangeParameterViewController label="Early reflections(db)" name="reverbEarlyReflections" min={-20} max={20} step={0.1} param={ctx.instrumentParameters.reverbEarlyReflections} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Card.Body>
            </RenderIfTrue>
        </Card>
    );
}