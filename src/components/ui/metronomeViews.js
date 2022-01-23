import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import * as PtqApi from "../api/pqtApi";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RenderBasedOnApiVersion } from "../utils/loading";
import { versionIsSupported } from "../utils/util";
import { InputSwitch, RangeViewController } from "./inputs";

export const MetronomeControlerButtonView = () => {
    const [hasClicked, setHasClicked] = useState(false);

    const onClose = () => { setHasClicked(!hasClicked); }

    return (
        <>
            <Button className="mx-2 mb-2 ps-2 pe-1 py-0" onTouchEnd={onClose} onClick={onClose}><img alt="metronome" src="/assets/metronome-white.png" /></Button>
            {hasClicked && (<MetronomeModalView show={hasClicked} handleClose={onClose} />)}
        </>

    );
}

export const MetronomeModalView = ({ show = false, handleClose }) => {
    const [ctx, reducer] = useInstrumentContext();

    const metronomeState = ctx.metronome;

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div className="d-flex flex-row justify-content-between">
                    <InputSwitch disabled={!versionIsSupported("7.5.3", ctx.ptqInfo.version)} name="metronome" label="Metronome" isChecked={metronomeState.enabled} onClick={(v) => { PtqApi.setMetronome({ ...metronomeState, enabled: v }, reducer) }} />
                </div>
            </Modal.Header>
            <Modal.Body>
                <RenderBasedOnApiVersion requiredVersion="7.5.3" currentVersion={ctx.ptqInfo.version}>
                    <div className="mb-2 d-flex flex-row justify-content-between">
                        <Dropdown onSelect={(ts) => { PtqApi.setMetronome({ ...metronomeState, timesig: ts }, reducer) }}>
                            <Dropdown.Toggle id="dropdown-basic">
                                <i className="bi bi-music-note-list"></i> ({metronomeState.timesig})
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1/1" active={"1/1" === metronomeState.timesig}>1/1</Dropdown.Item>
                                <Dropdown.Item eventKey="2/1" active={"2/2" === metronomeState.timesig}>2/2</Dropdown.Item>
                                <Dropdown.Item eventKey="2/4" active={"2/4" === metronomeState.timesig}>2/4</Dropdown.Item>
                                <Dropdown.Item eventKey="3/4" active={"3/4" === metronomeState.timesig}>3/4</Dropdown.Item>
                                <Dropdown.Item eventKey="4/4" active={"4/4" === metronomeState.timesig}>4/4</Dropdown.Item>
                                <Dropdown.Item eventKey="5/4" active={"5/4" === metronomeState.timesig}>5/4</Dropdown.Item>
                                <Dropdown.Item eventKey="3/8" active={"3/8" === metronomeState.timesig}>3/8</Dropdown.Item>
                                <Dropdown.Item eventKey="6/8" active={"6/8" === metronomeState.timesig}>6/8</Dropdown.Item>
                                <Dropdown.Item eventKey="7/8" active={"7/8" === metronomeState.timesig}>7/8</Dropdown.Item>
                                <Dropdown.Item eventKey="9/8" active={"9/8" === metronomeState.timesig}>9/8</Dropdown.Item>
                                <Dropdown.Item eventKey="12/8" active={"12/8" === metronomeState.timesig}>12/8</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <InputSwitch name="accentuate" label="Accentuate first beat" isChecked={metronomeState.accentuate} onClick={(v) => { PtqApi.setMetronome({ ...metronomeState, accentuate: v }, reducer) }} />
                        <div />
                    </div>
                    <div className="mb-2">
                        <RangeViewController disabled={true} label="Volume" name="volume" min={-35} max={20} step={1} value={metronomeState.volume_db} paramIdx={21} dispatch={reducer} onChange={(v) => reducer({ type: "setMetronome", value: { ...metronomeState, volume_db: v } })} apiCallback={(v, r) => { PtqApi.setMetronome({ ...metronomeState, bpm: v }, r) }} />
                    </div>
                    <div className="mb-2">
                        <RangeViewController disabled={true} label="Tempo" name="bpm" min={24} max={360} step={1} value={metronomeState.bpm} paramIdx={21} dispatch={reducer} onChange={(v) => reducer({ type: "setMetronome", value: { ...metronomeState, bpm: v } })} apiCallback={(v, r) => { PtqApi.setMetronome({ ...metronomeState, volume_db: v }, r) }} />
                    </div>
                    <p className="text-muted">Volume and tempo are disabled for now, as there is an issue with the current verison of Pianoteq's API.</p>
                </RenderBasedOnApiVersion>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

    )
}