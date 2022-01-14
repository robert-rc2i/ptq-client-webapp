import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { useInstrumentContext } from '../utils/instrumentContext';
import { InstrumentSelectionPaneView } from './instrumentsViews';
import * as PtqApi from '../api/pqtApi';

function TopMenu(props) {
    const [, reducer] = useInstrumentContext();
    const [ctx, setCtx] = useState({ show: false, instrName: "Instruments", classes: [] });
    const toggleShow = () => setCtx({ ...ctx, show: !ctx.show });
    return (
        <div className="pt-2 bg-secondary text-white d-flex justify-content-between sticky-top w-100 mb-2">
            <Button className="m-1" onClick={toggleShow}><strong><i class="bi bi-list"/></strong> Menu</Button>
            <Button className="m-1" onClick={(event) => { event.stopPropagation(); PtqApi.switchAB(reducer); }}>A/B Switch</Button>
            <InstrumentSelectionPaneView toggleFunction={toggleShow} show={ctx.show} instrumentName={ctx.instrName} classes={ctx.classes} />
        </div>
    );
}

export function LargeBar({ children }) {
    return (
        <Col md={9}>
            {children}
        </Col>
    )
}
/**
 * 
 * @param {Component} children to display in the small bar 
 */
export function SmallBar({ children }) {
    return (
        <Col md={3}>
            {children}
        </Col>
    );
}

/**
 * A one column layout with a Menu header and footer
 * @param {React.Component} props.children will position the provided component in the main column 
 */
export function PageLayout1Column(props) {

    return (
        <div className="d-flex flex-column h-100 w-100 px-3">
            <TopMenu />
            {props.children}
        </div>
    );
}

