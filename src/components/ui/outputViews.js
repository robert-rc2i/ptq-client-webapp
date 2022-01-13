import React from "react";
import * as pqtApi from '../api/pqtApi';
import { getParameterValueAsText } from "../domain/parameters";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RangeViewController } from "./inputs";

export const OutputCardView = () => {
    const [ctx, reducer] = useInstrumentContext();

    const volume = ctx.currentParameters && getParameterValueAsText("Volume", ctx.currentParameters);
    const dynamics = ctx.currentParameters && getParameterValueAsText("Dynamics", ctx.currentParameters);

    return (
        <div>
            <RangeViewController label="Volume" name="volume" min={-96} max={12} step={0.5} value={volume} paramIdx={21} dispatch={reducer} apiCallback={pqtApi.setVolume}/>
            <RangeViewController label="Dynamic" name="dynamic" min={0} max={100} step={1} value={dynamics} paramIdx={1} dispatch={reducer} apiCallback={pqtApi.setDynamics}/>
        </div>
    );
}