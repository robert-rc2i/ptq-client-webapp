import React from "react";
import { Accordion, Table } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputNumber, InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const EffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();
    return (
        <div className="mb-5">
            <div className="mb-2 ms-4 me-4">
                <NegativeRangeParameterViewController label="Post Effect Gain" name="fxGain" min={-12} max={12} step={0.2} param={ctx.instrumentParameters.postFxGain} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            </div>
            <Accordion>
                <Accordion.Item eventKey="delay">
                    <Accordion.Header>
                        <InputSwitch name="delaySwitch" label="Delay" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.delaySwitch.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.delaySwitch, reducer) }} />
                    </Accordion.Header>
                    <Accordion.Body>
                        <DelayView />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="eq1">
                    <Accordion.Header>
                        <InputSwitch name="eq1" label="EQ #1" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.eq1.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.eq1, reducer) }} />
                    </Accordion.Header>
                    <Accordion.Body>
                        <Equalizer1View />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="eq2">
                    <Accordion.Header>
                        <InputSwitch name="eq2" label="EQ #2" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.eq2.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.eq2, reducer) }} />
                    </Accordion.Header>
                    <Accordion.Body>
                        <Equalizer2View />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="reverb">
                    <Accordion.Header>
                        <InputSwitch name="reverbSwitch" label="Reverb" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.reverbSwitch.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.reverbSwitch, reducer) }} />
                    </Accordion.Header>
                    <Accordion.Body>
                        <ReverbView />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export const DelayView = () => {
    const [ctx, reducer] = useInstrumentContext();
    return (
        <>
            <RangeParameterViewController label="Mix(%)" name="delayMix" min={0} max={100} step={1} param={ctx.instrumentParameters.delayMix} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Delay(ms)" name="delayTime" min={1} max={1000} step={1} param={ctx.instrumentParameters.delayTime} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Feedback(%)" name="delayFeedback" min={0} max={100} step={1} param={ctx.instrumentParameters.delayFeedback} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Tone" name="delayTone" min={-1} max={1} step={.01} param={ctx.instrumentParameters.delayTone} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
        </>
    );
}

export const ReverbView = () => {
    const [ctx, reducer] = useInstrumentContext();
    return (
        <>
            <NegativeRangeParameterViewController label="Mix(db)" name="reverbMix" min={-50} max={50} step={0.1} param={ctx.instrumentParameters.reverbMix} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Duration(s)" name="reverbDuration" min={0} max={5} step={.01} param={ctx.instrumentParameters.reverbDuration} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Room size(m)" name="reverbRoomDimensions" min={5} max={50} step={.01} param={ctx.instrumentParameters.reverbRoomDimensions} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Pre-delay(s)" name="reverbPreDelay" min={.0} max={.200} step={.001} param={ctx.instrumentParameters.reverbPreDelay} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Tone" name="reverbTone" min={-1} max={1} step={0.01} param={ctx.instrumentParameters.reverbTone} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Early reflections(db)" name="reverbEarlyReflections" min={-20} max={20} step={0.1} param={ctx.instrumentParameters.reverbEarlyReflections} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
        </>
    );
}

export function Equalizer1View() {
    const [ctx, reducer] = useInstrumentContext();
    return (
<Table responsive borderless size="sm">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <td>Band 1</td>
                    <td>Band 2</td>
                    <td>Band 3</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Freq.</td>
                    <td><InputNumber name="eq2Frequency1" param={ctx.instrumentParameters.eq1Frequency1} dispatch={reducer} min={0} max={22050} /></td>
                    <td><InputNumber name="eq2Frequency1" param={ctx.instrumentParameters.eq1Frequency2} dispatch={reducer} min={0} max={22050} /></td>
                    <td><InputNumber name="eq2Frequency1" param={ctx.instrumentParameters.eq1Frequency3} dispatch={reducer} min={0} max={22050} /></td>
                </tr>
                <tr>
                    <td>Gains</td>
                    <td><InputNumber name="eq2Gain1" param={ctx.instrumentParameters.eq1Gain1} dispatch={reducer} min={-25} max={25} step={0.1} /></td>
                    <td><InputNumber name="eq2Gain1" param={ctx.instrumentParameters.eq1Gain2} dispatch={reducer} min={-25} max={25} step={0.1} /></td>
                    <td><InputNumber name="eq2Gain1" param={ctx.instrumentParameters.eq1Gain3} dispatch={reducer} min={-25} max={25} step={0.1} /></td>
                </tr>
                <tr>
                    <td>Q.</td>
                    <td><InputNumber name="eq2QFactor1" param={ctx.instrumentParameters.eq1QFactor1} dispatch={reducer} min={0} max={100} step={0.01} /></td>
                    <td><InputNumber name="eq2QFactor1" param={ctx.instrumentParameters.eq1QFactor2} dispatch={reducer} min={0} max={100} step={0.01} /></td>
                </tr>
            </tbody>
        </Table>
    );
}

export function Equalizer2View() {
    const [ctx, reducer] = useInstrumentContext();
    return (
        <Table responsive borderless size="sm">
            <thead>
                <tr>
                    <td>&nbsp;</td>
                    <td>Band 1</td>
                    <td>Band 2</td>
                    <td>Band 3</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Freq.</td>
                    <td><InputNumber name="eq2Frequency1" param={ctx.instrumentParameters.eq2Frequency1} dispatch={reducer} min={0} max={22050} /></td>
                    <td><InputNumber name="eq2Frequency1" param={ctx.instrumentParameters.eq2Frequency2} dispatch={reducer} min={0} max={22050} /></td>
                    <td><InputNumber name="eq2Frequency1" param={ctx.instrumentParameters.eq2Frequency3} dispatch={reducer} min={0} max={22050} /></td>
                </tr>
                <tr>
                    <td>Gains</td>
                    <td><InputNumber name="eq2Gain1" param={ctx.instrumentParameters.eq2Gain1} dispatch={reducer} min={-25} max={25} step={0.1} /></td>
                    <td><InputNumber name="eq2Gain1" param={ctx.instrumentParameters.eq2Gain2} dispatch={reducer} min={-25} max={25} step={0.1} /></td>
                    <td><InputNumber name="eq2Gain1" param={ctx.instrumentParameters.eq2Gain3} dispatch={reducer} min={-25} max={25} step={0.1} /></td>
                </tr>
                <tr>
                    <td>Q.</td>
                    <td><InputNumber name="eq2QFactor1" param={ctx.instrumentParameters.eq2QFactor1} dispatch={reducer} min={0} max={100} step={0.01} /></td>
                    <td><InputNumber name="eq2QFactor1" param={ctx.instrumentParameters.eq2QFactor2} dispatch={reducer} min={0} max={100} step={0.01} /></td>
                </tr>
            </tbody>
        </Table>
    );
}