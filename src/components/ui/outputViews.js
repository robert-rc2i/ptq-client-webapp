import React from "react";
import { Accordion, Card, Form } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';
import { getSwitchToBooleanValue } from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";

export const OutputCardView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <Accordion defaultActiveKey="sound" className="mb-5">
            <Accordion.Item eventKey="sound">
                <Accordion.Header>Piano Sound</Accordion.Header>
                <Accordion.Body>
                    <SoundModeView ctx={ctx} reducer={reducer} />
                    <NegativeRangeParameterViewController label="Volume" name="volume" min={-96} max={12} step={0.5} param={ctx.instrumentParameters.volume} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
                    <RangeParameterViewController label="Dynamic" name="dynamic" min={0} max={100} step={1} param={ctx.instrumentParameters.dynamics} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="condition">
                <Accordion.Header>Piano Condition</Accordion.Header>
                <Accordion.Body>
                    <PianoConditionCardView ctx={ctx} reducer={reducer} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="lid">
                <Accordion.Header>Piano Lid</Accordion.Header>
                <Accordion.Body>
                    <LidCardView ctx={ctx} reducer={reducer} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export const LidCardView = ({ ctx, reducer }) => {
    return (
        <>
            <div className="ms-5 mb-2">
                <InputSwitch name="lidSwitch" label={(<span>Enable piano lid modelisation</span>)} isChecked={getSwitchToBooleanValue(ctx.instrumentParameters.lid.text)} onClick={(v) => { pqtApi.setParameterSwitchValue(v, ctx.instrumentParameters.lid, reducer) }} />
            </div>
            <RangeParameterViewController disabled={ctx.instrumentParameters.isLidOff} label="Lid position" name="condition" min={0} max={1} step={0.01} param={ctx.instrumentParameters.lidPosition} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
            <div className="text-muted text-center"><p>From a closed lid (0) to wide open lid (1)</p></div>
        </>
    )
}
export const PianoConditionCardView = ({ ctx, reducer }) => {
    return (
        <>
            <RangeParameterViewController label="Wear and tear" name="condition" min={0} max={10} step={0.01} param={ctx.instrumentParameters.condition} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
            <div className="text-muted text-center"><p>From freshly tuned and serviced (0) to completely detuned and worn out (1)</p></div>
        </>
    );
}

export const SoundModeView = ({ ctx, reducer }) => {

    return (
        <div className="d-flex mb-2">
            <div>Modes:</div>
            <div className="ms-5">
                <Form.Check inline id="sr" label="Recording" name="soundMode" value="Sound Recording" type="radio" checked={"Sound Recording" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="binaural" label="Binaural" name="soundMode" value="Binaural" type="radio" checked={"Binaural" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="stero" label="Stereo" name="soundMode" value="Sterophonic" type="radio" checked={"Sterophonic" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="mono" label="Mono" name="soundMode" value="Monophonic" type="radio" checked={"Monophonic" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
            </div>
        </div>
    );
}