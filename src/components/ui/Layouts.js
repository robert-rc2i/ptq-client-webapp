import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useInstrumentContext } from '../utils/instrumentContext';
import { InstrumentSelectionPaneView } from './instrumentsViews';
import * as PtqApi from '../api/pqtApi';
import { PianotteqUrlSettingController } from './settingViews';

function TopMenu(props) {
    const [ctx, reducer] = useInstrumentContext();
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show);
    const isError = ctx.error;

    return (
        <div className="pt-2 bg-secondary text-white d-flex justify-content-between sticky-top w-100 mb-2">
            <Button className="m-2" onTouchEnd={toggleShow} onClick={toggleShow}><strong><i className="lead bi bi-list"/></strong> Menu</Button>
            <Button className="m-2" disabled={isError} onClick={(event) => { event.stopPropagation(); PtqApi.switchAB(reducer); }}><strong><i className="bi bi-arrow-left-right"></i></strong> A/B</Button>
            <Offcanvas show={show} onHide={toggleShow}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Main menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <PianotteqUrlSettingController onClose={toggleShow} dispatch={reducer}/>
                    <h6>Instrument selection</h6>
                    <InstrumentSelectionPaneView toggleFunction={toggleShow} />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

/**
 * A one column layout with a Menu header and footer
 * @param {React.Component} props.children will position the provided component in the main column 
 */
export function PageLayout1Column(props) {

    return (
        <div className="h-100 w-100">
            <TopMenu />
            <div className="mx-2">
                {props.children}
            </div>
        </div>
    );
}

