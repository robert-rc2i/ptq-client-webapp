import React from 'react';
import { useInstrumentContext } from '../utils/instrumentContext';
import { RenderIfTrue } from '../utils/loading';

export function AppVersionView({ appVersion = "1.0.0", apiVersion = "7.5.3" }) {
    const [ctx] = useInstrumentContext();
    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="text-muted">Web application version</div>
                <div className="text-muted">{appVersion}</div>
            </div>
            <RenderIfTrue predicate={ctx.ptqInfo.version}>
                <div className="d-flex justify-content-between">
                    <div className="text-muted">Detected Pianoteq version</div>
                    <div className="text-muted">{ctx.ptqInfo.version}</div>
                </div>
            </RenderIfTrue>
        </>
    );
}