import React from "react";
import * as pqtApi from '../api/pqtApi';
import { useInstrumentContext } from "../utils/instrumentContext";
import { NegativeRangeParameterViewController, RangeParameterViewController } from "./inputs";

export const OutputCardView = () => {
    const [ctx, reducer] = useInstrumentContext();

    return (
        <div>
            <NegativeRangeParameterViewController label="Volume" name="volume" min={-96} max={12} step={0.5} param={ctx.instrumentParameters.volume} dispatch={reducer} apiCallback={pqtApi.setParameterAsText}/>
            <RangeParameterViewController label="Dynamic" name="dynamic" min={0} max={100} step={1} param={ctx.instrumentParameters.dynamics} dispatch={reducer} apiCallback={pqtApi.setParameterAsText}/>
        </div>
    );
}