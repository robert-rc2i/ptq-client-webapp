import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { InstrumentSelectionPaneView } from './instrumentsViews';

function Footer(props) {
    const [ctx, setCtx] = useState({show: false, instrName:"Instruments", classes:[]});
    const toggleShow = () => setCtx({...ctx, show: !ctx.show});
    return (
        <div className="d-flex justify-content-around fixed-bottom w-100 bg-light">
            <Button variant='primary' onClick={(event) => {event.preventDefault(); event.stopPropagation(); setCtx({show: true, instrName:"Acoustic pianos", classes:["Acoustic Piano","Piano Predecessor","Historical Piano"]})}}>Accoustic<br/>Pianos</Button>
            <Button variant='primary' onClick={(event) => {event.preventDefault(); event.stopPropagation(); setCtx({show: true, instrName:"Electric pianos", classes:["Electric Piano"]})}}>Electric<br/>Pianos</Button>
            <Button variant='primary' onClick={(event) => {event.preventDefault(); event.stopPropagation(); setCtx({show: true, instrName:"Chromatic percusion", classes:["Chromatic Percussion"]})}}>Chromatic<br/>Percusions</Button>
            <Button variant='primary' onClick={(event) => {event.preventDefault(); event.stopPropagation(); setCtx({show: true, instrName:"Drums", classes:["Steelpan"]})}}>Drums</Button>
            <InstrumentSelectionPaneView toggleFunction={toggleShow} show={ctx.show} instrumentName={ctx.instrName} classes={ctx.classes}/>
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
            <Row>
                {props.children}
            </Row>
            <Footer />
        </div>
    );
}

