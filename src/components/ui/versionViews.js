import React from 'react';
import { useInstrumentContext } from '../utils/instrumentContext';
import { RenderIfTrue } from '../utils/loading';

export function AppVersionView({ appVersion = "1.0.0", apiVersion = "7.5.3" }) {
    const [ctx] = useInstrumentContext();
    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="text-muted"><small>Web application version</small></div>
                <div className="text-muted"><small>{appVersion}</small></div>
            </div>
            <RenderIfTrue predicate={ctx.ptqInfo.version}>
                <div className="d-flex justify-content-between">
                    <div className="text-muted"><small>Detected Pianoteq version</small></div>
                    <div className="text-muted"><small>{ctx.ptqInfo.version}</small></div>
                </div>
            </RenderIfTrue>
        </>
    );
}