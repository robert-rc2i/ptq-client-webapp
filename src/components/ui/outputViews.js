import React from "react";
import { Form } from "react-bootstrap";
import * as pqtApi from '../api/pqtApi';
import { getParameterValueAsText } from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";

export const OutputCardView = () => {
    const [ctx, dispatch] = useInstrumentContext();
    const volume = ctx.currentParameters && getParameterValueAsText("Volume", ctx.currentParameters);
    const dynamics = ctx.currentParameters && getParameterValueAsText("Dynamics", ctx.currentParameters);

    console.log("[OutputCardView] Volume, Dynamics", volume, dynamics)

    return (
        <div>
            <Form.Label>Volume ({volume}db)</Form.Label>
            <Form.Range name="volume" defaultValue={volume} min={-96} max={12} step={0.5} onTouchEnd={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.setVolume(event.target.value, dispatch)}} onClick={(event) => { event.preventDefault(); event.stopPropagation(); pqtApi.setVolume(event.target.value, dispatch)}}/>
            <Form.Label>Dynamics ({dynamics} db)</Form.Label>
            <Form.Range name="dynamics" defaultValue={dynamics}  min={0} max={100} step={1} onClick={(event) => {event.preventDefault(); event.stopPropagation(); pqtApi.setDynamics(event.target.value, dispatch)}}/>
        </div>
    );
}