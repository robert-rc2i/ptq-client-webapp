import React, { useEffect } from "react";
import { useInstrumentContext } from "../utils/instrumentContext";
import { CompactViewPage } from "./compactViewPage";
import { CurrentInstrumentPage } from "./currentInstrumentPage";

export function PageRoute({ viewMode = "compact" }) {
    const [ctx, reducer] = useInstrumentContext();
    useEffect(() => {
        let vMode = window.localStorage.getItem("ptqViewMode");
        if (!vMode) {
            vMode = viewMode;
            window.localStorage.setItem("ptqViewMode", vMode);
        }
        reducer({ type: "setViewMode", value: vMode });
    }, []);

    if (ctx.viewMode === "compact") {
        return (<CompactViewPage/>);
    }

    return (<CurrentInstrumentPage/>);
}