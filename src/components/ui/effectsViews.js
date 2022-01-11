import React, { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputRange, InputSwitch } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const EffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();

    const fxGain = Parameters.getFxGain(ctx.currentParameters);
    const delaySwitch = Parameters.getDelay(ctx.currentParameters);
    const eq1State = Parameters.getEq1(ctx.currentParameters);
    const eq2State = Parameters.getEq2(ctx.currentParameters);
    const reverb = Parameters.getReverb(ctx.currentParameters);

    console.log("Switches", delaySwitch, eq1State, eq2State, reverb);

    return (
        <Container>
            <div>
                <FxGainView fxGain={fxGain} dispatch={reducer} />
            </div>
            <Card>
                <Card.Header>Toggel effects</Card.Header>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-evenly">
                        <DelayEffectView delayState={delaySwitch} dispatch={reducer} />
                        <ReverbEffectView reverbState={reverb} dispatch={reducer} />
                    </div>
                    <div className="d-flex flex-row justify-content-evenly mt-3">
                        <Eq31EffectView eqState={eq1State} dispatch={reducer} />
                        <Eq32EffectView eqState={eq2State} dispatch={reducer} />
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export const FxGainView = ({ fxGain, dispatch }) => {
    const [fxGainVal, setFxGain] = useState(fxGain);
    return (
        <>
            <Form.Label>Post Effect Gain ({fxGainVal}db)</Form.Label>
            <InputRange name="fxGain" value={fxGainVal} min={-12} max={12} step={0.2} onChange={setFxGain} onSetRangeValue={(v) => { PtqApi.setFxGain(fxGainVal, dispatch) }} />
        </>
    );
}

export const DelayEffectView = ({ delayState, dispatch }) => {
    const [delayVal, setDelaySwitch] = useState(delayState);
    return (
        <InputSwitch name="delay" label="Delay" isChecked={delayVal} onClick={(v) => { setDelaySwitch(v); PtqApi.setDelayEffectSwitch(v, dispatch) }} />
    );
}

export const Eq31EffectView = ({ eqState, dispatch }) => {
    const [eqVal, setEqSwitch] = useState(eqState);
    return (
        <InputSwitch name="eq1" label="EQ #1" isChecked={eqVal} onClick={(v) => { setEqSwitch(v); PtqApi.setEq1EffectSwitch(v, dispatch) }} />
    );
}

export const Eq32EffectView = ({ eqState, dispatch }) => {
    return (
        <InputSwitch name="eq2" label="EQ #2" isChecked={eqState} onClick={(v) => { PtqApi.setEq2EffectSwitch(v, dispatch) }} />
    );
}

export const ReverbEffectView = ({ reverbState, dispatch }) => {
    return (
        <InputSwitch name="reverb" label="Reverb" isChecked={reverbState} onClick={(v) => { PtqApi.setReverb(v, dispatch) }} />
    );
}
