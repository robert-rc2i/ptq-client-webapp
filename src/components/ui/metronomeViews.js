import React, { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import * as PtqApi from "../api/pqtApi";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RenderBasedOnApiVersion } from "../utils/loading";
import { InputSwitch, RangeViewController } from "./inputs";

export const MetronomeControlerButtonView = () => {
    const [ctx, reducer] = useInstrumentContext();
    const [hasClicked, setHasClicked] = useState(false);

    const onClose = () => { setHasClicked(!hasClicked); }
    const buttonVariant = ctx.metronome.enabled ? "info" : "outline-secondary"
    return (
        <>
            <Button title="Metronome controls" variant={buttonVariant} className="mb-2 me-2 px-3 py-1" onClick={onClose}><img alt="metronome" src="/assets/metronome-tick.png" /></Button>
            {hasClicked && (<MetronomeModalView show={hasClicked} handleClose={onClose} ctx={ctx} reducer={reducer} />)}
        </>

    );
}

export const MetronomeModalView = ({ show = false, handleClose, ctx, reducer }) => {

    const metronomeState = ctx.metronome;

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>Metronome</Modal.Header>
            <Modal.Body>
                <RenderBasedOnApiVersion requiredVersion="7.5.4" currentVersion={ctx.ptqInfo.version}>
                    <div className="mb-4 d-flex justify-content-between">
                        <InputSwitch name="accentuate" label={(<span>Accentuate<br />first beat</span>)} isChecked={metronomeState.accentuate} onClick={(v) => { PtqApi.setMetronome({ ...metronomeState, accentuate: v }, reducer) }} />
                        <TimeSignatureControlerView metronome={ctx.metronome} reducer={reducer} />
                    </div>
                    <BpmControlerView metronome={metronomeState} reducer={reducer} />
                    <RangeViewController label="BPM" labelValue={false} name="bpm" min={24} max={360} step={1} value={metronomeState.bpm} dispatch={reducer} onChange={(v) => reducer({ type: "setMetronome", value: { ...metronomeState, bpm: v } })} apiCallback={(v, r) => { PtqApi.setMetronome({ ...metronomeState, bpm: v }, r) }} />
                    <RangeViewController label="Volume" name="volume" min={-35} max={20} step={1} value={metronomeState.volume_db} dispatch={reducer} onChange={(v) => reducer({ type: "setMetronome", value: { ...metronomeState, volume_db: v } })} apiCallback={(v, r) => { PtqApi.setMetronome({ ...metronomeState, volume_db: v }, r) }} />
                    <hr />
                    <div className="d-flex justify-content-center">
                        <Button variant={metronomeState.enabled ? "info" : "primary"} className="pb-0" onClick={() => { PtqApi.setMetronome({ ...metronomeState, enabled: !metronomeState.enabled }, reducer) }} ><h3><i className="bi bi-pause" /><i className="bi bi-play" /></h3></Button>
                    </div>
                </RenderBasedOnApiVersion>
            </Modal.Body>
        </Modal>

    )
}

export const BpmControlerView = ({ metronome, reducer }) => {
    return (
        <div className="mb-2 d-flex justify-content-around align-items-center">
            <span onClick={() => { PtqApi.setMetronome({ ...metronome, bpm: metronome.bpm - 1 }, reducer) }}><h2><i className="bi bi-chevron-left" /></h2></span>
            <div className="mb-2 text-center">
                <h1>{metronome.bpm}</h1>
                <h5>{metronome.tempoAsText}</h5>
            </div>
            <span onClick={() => { PtqApi.setMetronome({ ...metronome, bpm: metronome.bpm + 1 }, reducer) }}> <h2><i className="bi bi-chevron-right" /></h2></span>
        </div>

    );
}

export const TimeSignatureControlerView = ({ metronome, reducer }) => {
    return (
        <Dropdown onSelect={(ts) => { PtqApi.setMetronome({ ...metronome, timesig: ts }, reducer) }}>
            <Dropdown.Toggle id="dropdown-basic">
                <i className="bi bi-music-note-list"></i> ({metronome.timesig})
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="1/1" active={"1/1" === metronome.timesig}>1/1</Dropdown.Item>
                <Dropdown.Item eventKey="2/1" active={"2/2" === metronome.timesig}>2/2</Dropdown.Item>
                <Dropdown.Item eventKey="2/4" active={"2/4" === metronome.timesig}>2/4</Dropdown.Item>
                <Dropdown.Item eventKey="3/4" active={"3/4" === metronome.timesig}>3/4</Dropdown.Item>
                <Dropdown.Item eventKey="4/4" active={"4/4" === metronome.timesig}>4/4</Dropdown.Item>
                <Dropdown.Item eventKey="5/4" active={"5/4" === metronome.timesig}>5/4</Dropdown.Item>
                <Dropdown.Item eventKey="3/8" active={"3/8" === metronome.timesig}>3/8</Dropdown.Item>
                <Dropdown.Item eventKey="6/8" active={"6/8" === metronome.timesig}>6/8</Dropdown.Item>
                <Dropdown.Item eventKey="7/8" active={"7/8" === metronome.timesig}>7/8</Dropdown.Item>
                <Dropdown.Item eventKey="9/8" active={"9/8" === metronome.timesig}>9/8</Dropdown.Item>
                <Dropdown.Item eventKey="12/8" disabled active={"12/8" === metronome.timesig}>12/8</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
} 