import React from "react";
import { Card } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, RangeViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const EffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();

    const fxGain = Parameters.getFxGain(ctx.currentParameters);
    const delayState = Parameters.getDelay(ctx.currentParameters);
    const eq1State = Parameters.getEq1(ctx.currentParameters);
    const eq2State = Parameters.getEq2(ctx.currentParameters);
    const reverb = Parameters.getReverb(ctx.currentParameters);

    return (
        <div>
            <div className="mb-2">
                <FxGainView fxGain={fxGain} dispatch={reducer} />
            </div>
            <Card>
                <Card.Header>Toggle effects</Card.Header>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-evenly">
                        <DelayEffectView delayState={delayState} dispatch={reducer} />
                        <ReverbEffectView reverbState={reverb} dispatch={reducer} />
                    </div>
                    <div className="d-flex flex-row justify-content-evenly mt-3">
                        <Eq31EffectView eqState={eq1State} dispatch={reducer} />
                        <Eq32EffectView eqState={eq2State} dispatch={reducer} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export const FxGainView = ({ fxGain, dispatch }) => {
    return (
        <RangeViewController label="Post Effect Gain" name="fxGain" min={-12} max={12} step={0.2} value={Number.parseFloat(fxGain)} paramIdx={22} dispatch={dispatch} apiCallback={PtqApi.setFxGain}/>
    );
}

export const DelayEffectView = ({ delayState, dispatch }) => {
    return (
        <InputSwitch name="delay" label="Delay" isChecked={delayState} onClick={(v) => {PtqApi.setDelayEffectSwitch(v, dispatch) }} />
    );
}

export const Eq31EffectView = ({ eqState, dispatch }) => {
    return (
        <InputSwitch name="eq1" label="EQ #1" isChecked={eqState} onClick={(v) => { PtqApi.setEq1EffectSwitch(v, dispatch) }} />
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
