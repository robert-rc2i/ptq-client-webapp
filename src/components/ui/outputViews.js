import React from "react";
import { Card, Form } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';
import { getSwitchToBooleanValue } from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";

export const OutputCardView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <div className="mb-5">
            <Card className="mb-2">
                <Card.Header>Piano sound</Card.Header>
                <Card.Body>
                    <SoundModeView ctx={ctx} reducer={reducer} />
                    <NegativeRangeParameterViewController label="Volume" name="volume" min={-96} max={12} step={0.5} param={ctx.instrumentParameters.volume} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
                    <RangeParameterViewController label="Dynamic" name="dynamic" min={0} max={100} step={1} param={ctx.instrumentParameters.dynamics} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
                </Card.Body>
            </Card>
            <PianoConditionCardView ctx={ctx} reducer={reducer} />
            <LidCardView ctx={ctx} reducer={reducer} />
        </div>
    );
}

export const LidCardView = ({ ctx, reducer }) => {
    return (
        <Card className="mb-2">
            <Card.Header><InputSwitch name="lidSwitch" label="Piano lid" isChecked={getSwitchToBooleanValue(ctx.instrumentParameters.lid.text)} onClick={(v) => { pqtApi.setParameterSwitchValue(v, ctx.instrumentParameters.lid, reducer) }} /></Card.Header>
            <Card.Body>
                <RangeParameterViewController disabled={ctx.instrumentParameters.isLidOff} label="Lid position" name="condition" min={0} max={1} step={0.01} param={ctx.instrumentParameters.lidPosition} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
                <div className="text-muted text-center"><p>From a closed lid (0) to wide open lid (1)</p></div>
            </Card.Body>
        </Card>
    )
}
export const PianoConditionCardView = ({ ctx, reducer }) => {
    return (
        <Card className="mb-2">
            <Card.Header>Piano condition</Card.Header>
            <Card.Body>
                <RangeParameterViewController label="Wear and tear" name="condition" min={0} max={10} step={0.01} param={ctx.instrumentParameters.condition} dispatch={reducer} apiCallback={pqtApi.setParameterAsText} />
                <div className="text-muted text-center"><p>From freshly tuned and serviced (0) to completely detuned and worn out (1)</p></div>
            </Card.Body>
        </Card>
    );
}

export const SoundModeView = ({ ctx, reducer }) => {

    return (
        <div className="d-flex flex-column mb-2">
            <div className="mb-2">Modes:</div>
            <div className="ms-5">
                <Form.Check inline id="sr" label="Recording" name="soundMode" value="Sound Recording" type="radio" checked={"Sound Recording" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="binaural" label="Binaural" name="soundMode" value="Binaural" type="radio" checked={"Binaural" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="stero" label="Stereo" name="soundMode" value="Sterophonic" type="radio" checked={"Sterophonic" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
                <Form.Check inline id="mono" label="Mono" name="soundMode" value="Monophonic" type="radio" checked={"Monophonic" === ctx.instrumentParameters.outputMode.text} onChange={(v) => { pqtApi.setParameterAsText(v.target.value, ctx.instrumentParameters.outputMode, reducer) }} />
            </div>
        </div>
    );
}