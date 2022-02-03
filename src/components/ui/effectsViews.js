import React from "react";
import { Card } from "react-bootstrap";
import * as Parameters from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputSwitch, NegativeRangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const EffectsTabView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <div className="mb-5">
            <div className="mb-2">
            <NegativeRangeParameterViewController label="Post Effect Gain" name="fxGain" min={-12} max={12} step={0.2} param={ctx.instrumentParameters.postFxGain} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            </div>
            <Card>
                <Card.Header>Toggle effects</Card.Header>
                <Card.Body>
                    <div className="d-flex flex-row justify-content-evenly">
                        <InputSwitch name="delay" label="Delay" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.delay.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.delay, reducer) }} />
                        <InputSwitch name="reverb" label="Reverb" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.reverb.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.reverb, reducer) }} />
                    </div>
                    <div className="d-flex flex-row justify-content-evenly mt-3">
                        <InputSwitch name="eq1" label="EQ #1" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.eq1.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.eq1, reducer) }} />
                        <InputSwitch name="eq2" label="EQ #2" isChecked={Parameters.getSwitchToBooleanValue(ctx.instrumentParameters.eq2.text)} onClick={(v) => { PtqApi.setParameterSwitchValue(v, ctx.instrumentParameters.eq2, reducer) }} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}