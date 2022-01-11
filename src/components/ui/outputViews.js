import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';
import { getParameterValueAsText } from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { InputRange } from "./inputs";

export const OutputCardView = () => {
    const [ctx, reducer] = useInstrumentContext();

    const volume = ctx.currentParameters && getParameterValueAsText("Volume", ctx.currentParameters);
    const dynamics = ctx.currentParameters && getParameterValueAsText("Dynamics", ctx.currentParameters);

    return (
        <div>
            <VolumeRangeView volume={volume} dispatch={reducer} />
            <DynamicsRangeView dynamics={dynamics} dispatch={reducer} />
        </div>
    );
}

const VolumeRangeView = ({ volume, dispatch }) => {
    const [vol, setVolume] = useState(volume);

    return (
        <>
            <Form.Label>Volume ({vol}db)</Form.Label>
            <InputRange name="volume" value={vol} min={-96} max={12} step={0.5} onChange={setVolume} onSetRangeValue={(v) => { pqtApi.setVolume(v, dispatch) }} />
        </>
    );
}

const DynamicsRangeView = ({ dynamics, dispatch }) => {
    const [dyn, setDynamics] = useState(dynamics);

    return (
        <div>
            <Form.Label>Dynamics ({dyn}db)</Form.Label>
            <InputRange name="dynamics" value={dyn} min={0} max={100} step={1} onChange={setDynamics} onSetRangeValue={(v) => { pqtApi.setDynamics(v, dispatch) }} />
        </div>
    )
}