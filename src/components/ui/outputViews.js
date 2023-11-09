import React from "react";
import { Accordion, Form } from "react-bootstrap";
import * as PtqApi from '../api/pqtApi';
import { getSwitchToBooleanValue } from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { versionIsSupported } from "../utils/util";
import { FractionRangeParameterViewController, InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";

export const OutputCardView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <Accordion className="mb-5">
            <Accordion.Item eventKey="sound">
                <Accordion.Header>Piano Sound</Accordion.Header>
                <Accordion.Body>
                    <SoundModeView ctx={ctx} reducer={reducer} />
                    <NegativeRangeParameterViewController label="Volume" name="volume" min={-96} max={12} step={0.5} param={ctx.instrumentParameters.volume} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Dynamic" name="dynamic" min={0} max={100} step={1} param={ctx.instrumentParameters.dynamics} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="action">
                <Accordion.Header>Action</Accordion.Header>
                <Accordion.Body>
                    <PianoAction ctx={ctx} reducer={reducer} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="condition">
                <Accordion.Header>Piano Condition</Accordion.Header>
                <Accordion.Body>
                    <PianoConditionCardView ctx={ctx} reducer={reducer} />
                </Accordion.Body>
            </Accordion.Item>
            {ctx.instrumentParameters.lid && (
                <Accordion.Item eventKey="lid">
                    <Accordion.Header>Piano Lid</Accordion.Header>
                    <Accordion.Body>
                        <LidCardView ctx={ctx} reducer={reducer} />
                    </Accordion.Body>
                </Accordion.Item>)
            }

        </Accordion>
    );
}

export const PianoAction = ({ ctx, reducer }) => {
    return (
        <>
            <FractionRangeParameterViewController label="Damper position" name="dpos" min={2} max={64} step={0.1} param={ctx.instrumentParameters.damperPosition} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Damper duration" name="ddur" min={.03} max={10.00} step={0.01} param={ctx.instrumentParameters.damperDuration} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Last damper" name="lndamper" min={0} max={128} step={1} param={ctx.instrumentParameters.lastDamperNote} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            {ctx.instrumentParameters.damperPosition && (<hr />)}
            <RangeParameterViewController label="Mute" name="mute" min={0} max={1} step={0.01} param={ctx.instrumentParameters.mute} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Damper noise" name="dnoise" min={-75} max={25} step={1} param={ctx.instrumentParameters.damperNoise} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Key release noise" name="krnoise" min={-75} max={25} step={1} param={ctx.instrumentParameters.keyReleaseNoise} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <NegativeRangeParameterViewController label="Sustain pedal noise" name="spnoise" min={-75} max={25} step={1} param={ctx.instrumentParameters.sustainPedalNoise} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
        </>
    );
}
export const LidCardView = ({ ctx, reducer }) => {
    if (ctx.instrumentParameters.lid && ctx.instrumentParameters.lid.text) {
        return (
            <>
                <div className="ms-5 mb-2">
                    <InputSwitch name="lidSwitch" label={(<span>Enable piano lid modelisation</span>)} isChecked={getSwitchToBooleanValue(ctx.instrumentParameters.lid.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.lid, reducer) }} />
                </div>
                <RangeParameterViewController disabled={ctx.instrumentParameters.isLidOff} label="Lid position" name="condition" min={0} max={1} step={0.01} param={ctx.instrumentParameters.lidPosition} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                <div className="text-muted text-center"><p>From a closed lid (0) to wide open lid (1)</p></div>
            </>
        );
    }
    return null;
}
export const PianoConditionCardView = ({ ctx, reducer }) => {
    return (
        <>
            <RangeParameterViewController label="Wear and tear" name="condition" min={0} max={10} step={0.01} param={ctx.instrumentParameters.condition} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <div className="text-muted text-center"><p>From freshly tuned and serviced (0) to completely detuned and worn out (1)</p></div>
        </>
    );
}

export const SoundModeView = ({ ctx, reducer }) => {
    //For version 7 only
    let micLabel = "Recording";
    let micValue = "Sound Recording";

    //Apply version 8 values if required
    if (versionIsSupported("8.0.0", ctx.ptqInfo.version)) {
        micLabel = "Microphones";
        micValue = "Microphones";
    }

    return (
        <div className="d-flex mb-2">
            <div>Modes:</div>
            <div className="ms-5">
                <Form.Check inline id="sr" label={micLabel} name="soundMode" value={micValue} type="radio" checked={micValue === ctx.instrumentParameters.outputMode.text} onChange={(v) => { PtqApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="binaural" label="Binaural" name="soundMode" value="Binaural" type="radio" checked={"Binaural" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { PtqApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="stero" label="Stereo" name="soundMode" value="Sterophonic" type="radio" checked={"Sterophonic" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { PtqApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="mono" label="Mono" name="soundMode" value="Monophonic" type="radio" checked={"Monophonic" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { PtqApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
            </div>
        </div>
    );
}