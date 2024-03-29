import React, { useState } from 'react';
import { Alert, Button, Offcanvas } from 'react-bootstrap';
import { useInstrumentContext } from '../utils/instrumentContext';
import { InstrumentSelectionPaneView } from './instrumentsViews';
import { PianotteqUrlSettingController } from './settingViews';
import { MidiControlerButtonView } from './midiControlViews';
import { MetronomeControlerButtonView } from './metronomeViews';
import { AppVersionView } from './versionViews';

function TopMenu() {
    const [, reducer] = useInstrumentContext();
    const [show, setShow] = useState({ menu: false });
    const toggleMenu = (e) => { setShow({ ...show, menu: !show.menu }); }

    return (
        <>
            <div className="pt-2 bg-primary d-flex justify-content-between sticky-top w-100 mb-2">
                <Button title="Menu" variant='outline-secondary' className="text-white mx-2 mb-2 px-2 py-0" onClick={toggleMenu}><i className="bi bi-list" /> Menu</Button>
                <div>
                    <MidiControlerButtonView />
                    <MetronomeControlerButtonView />
                </div>
            </div>
            <Offcanvas show={show.menu} onHide={toggleMenu}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Main menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <PianotteqUrlSettingController onClose={toggleMenu} dispatch={reducer} />
                    <h6>Instrument selection</h6>
                    <InstrumentSelectionPaneView toggleFunction={toggleMenu} />
                    <AppVersionView appVersion={process.env.REACT_APP_appVersion} apiVersion={process.env.REACT_APP_apiVersion} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
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

export function InfoView({ title = null, children, initialState=false }) {
    const [show, setShow] = useState(initialState);

    if (show) {
        return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
                {title && <Alert.Heading>{title}</Alert.Heading>}
                {children}
            </Alert>
        );
    }

    return null;
}