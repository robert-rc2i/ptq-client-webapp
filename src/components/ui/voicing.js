import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { useInstrumentContext } from "../utils/instrumentContext";
import { RangeParameterViewController } from "./inputs";
import * as PtqApi from "../api/pqtApi";

export const VoicingTabView = () => {

    const [ctx, reducer] = useInstrumentContext();

    return (
        <Accordion defaultActiveKey="hammer" className="mb-5">
            <Accordion.Item eventKey="hammer">
                <Accordion.Header>Hammer</Accordion.Header>
                <Accordion.Body>
                    <RangeParameterViewController label="Piano dynamics" name="piano" min={0} max={2} step={0.1} param={ctx.instrumentParameters.hammerHardnessPiano} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Mezzo dynamics" name="mezo" min={0} max={2} step={0.1} param={ctx.instrumentParameters.hammerHardnessMezzo} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <RangeParameterViewController label="Forte dynamics" name="forte" min={0} max={2} step={0.1} param={ctx.instrumentParameters.hammerHardnessForte} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <div className="text-muted text-center"><p>Adjust the hammer hardner at 3 different velocities</p></div>
                    <hr />
                    <RangeParameterViewController label="Hammer noise" name="hnoise" min={0.1} max={3} step={0.01} param={ctx.instrumentParameters.hammerNoise} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <div className="text-muted text-center"><p>Adjust the weight of the hammer percussion sound</p></div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="profile">
                <Accordion.Header>Spectrum</Accordion.Header>
                <Accordion.Body>
                    <SpectrumProfile context={ctx} reducer={reducer} />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="pedal">
                <Accordion.Header>Pedal</Accordion.Header>
                <Accordion.Body>
                    <RangeParameterViewController label="Soft pedal smoothing" name="softPedal" min={0} max={1} step={0.01} param={ctx.instrumentParameters.softPedalSmoothing} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
                    <div className="text-muted text-center"><p>Adjust the smoothing degree of the una corda pedal</p></div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

const SpectrumProfile = ({ context: ctx, reducer }) => {
    return (
        <>
            <RangeParameterViewController label="Profile #1" name="profile1" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile1} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #2" name="profile2" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile2} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #3" name="profile3" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile3} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #4" name="profile4" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile4} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #5" name="profile5" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile5} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #6" name="profile6" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile6} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #7" name="profile7" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile7} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
            <RangeParameterViewController label="Profile #8" name="profile8" min={-15} max={15} step={0.01} param={ctx.instrumentParameters.spectrumProfile8} dispatch={reducer} apiCallback={PtqApi.setParameterAsText} />
        </>
    )
}