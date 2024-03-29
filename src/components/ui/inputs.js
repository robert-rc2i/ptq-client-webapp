import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import * as PtqApi from "../api/pqtApi";

export const dummyFunction = () => { };

export const InputNumber = ({ dispatch = dummyFunction, param = {}, ...others }) => {
    const [paramValue, setParamValue] = useState(0);
    useEffect(
        () => {setParamValue(param.text.replace('+', ''))},
        [param.text]
    );
    const handleChange = (e) => {
        setParamValue(e.target.value);
    };
    const handleSaveValue = (e) => {
        const newValue = e.target.value;
        if (newValue !== param.text.replace('+', '')) {
            PtqApi.setParameterAsText(newValue, param, dispatch);
        };
    }

    return (
        <input {...others} type="number" value={paramValue} onChange={handleChange} onBlur={handleSaveValue} />
    );
}

/**
 * 
 * @param {onChange} function A callback function when the slider is being moved
 * @param {onSetRangeValue} function A callback function when the slider value is set, happens when the user release the mouse button or after the touch event 
 * @returns 
 */
export const InputRange = ({ onChange, onSetRangeValue, value, ...others }) => {
    return (
        <div className="ms-5">
            <input {...others} type="range" className="form-range" value={value} onChange={(e) => { e.preventDefault(); onChange(e.target.value) }} onTouchEnd={(e) => { e.preventDefault(); onSetRangeValue(e.target.value) }} onMouseUp={(e) => { onSetRangeValue(e.target.value); }} />
        </div>
    )
}

export const InputSwitch = ({ name = "none", label, isChecked = false, onClick, ...others }) => {
    if (name && name !== "none") {
        return (
            <div className="form-check form-switch">
                <input {...others} className="form-check-input" type="checkbox" role="switch" id={name} checked={isChecked} onClick={(e) => e.stopPropagation()} onChange={(e) => onClick(e.target.checked, e)} />
                <label className="form-check-label" htmlFor={name}>{label}</label>
            </div>
        );
    }

    return null;
}

const defaultLabelRenderer = (label, lblValue) => {
    return `${label} ${lblValue}`;
}

export const RangeViewController = ({ value, dispatch, labelCallback = undefined, label = "none", labelValue = true, rangeReversed = false, apiCallback, min = 0, max = 10, step = 0.1, name = "None set", paramIdx, onChange = null, ...others }) => {
    const handleChange = onChange ? onChange : (v) => { dispatch({ type: "setParameter", index: paramIdx, value: v }) };
    const lblValue = labelValue ? `(${value})` : "";
    const orientationStyle = rangeReversed ? { direction: "rtl" } : null;
    return (
        <>
            <Form.Label>{labelCallback ? labelCallback(label, value) : defaultLabelRenderer(label, lblValue)}</Form.Label>
            <InputRange {...others} name={name} style={orientationStyle} value={value} min={min} max={max} step={step} onChange={(v) => handleChange(v)} onSetRangeValue={(v) => { apiCallback(v, dispatch); }} />
        </>
    );
}

export const RangeParameterViewController = ({ param = {}, apiCallback, ...others }) => {
    if (param && param.id) {
        const setParamCallback = (value, dispatch) => { apiCallback(value, param, dispatch) };
        return (
            <RangeViewController {...others} value={param.text} paramIdx={param.index} apiCallback={setParamCallback} />
        );
    }
    return null;
}

const fractionLabelRenderer = (lbl, v) => { return `${lbl} (1/${v})` };

export const FractionRangeParameterViewController = ({ param = {}, apiCallback, label, ...others }) => {
    if (param && param.id) {
        const setParamCallback = (v, dispatch) => { apiCallback("1/" + v, param, dispatch) };
        const splitedValues = param?.text.split('/');
        const val = splitedValues.length > 1 ? splitedValues[1] : param.text;
        return (
            <RangeViewController {...others} rangeReversed={true} value={val} labelCallback={fractionLabelRenderer} label={label} labelValue={false} paramIdx={param.index} apiCallback={setParamCallback} />
        )
    }
    return null;
}

export const NegativeRangeParameterViewController = ({ param = {}, apiCallback, ...others }) => {
    const setParamCallback = (value, dispatch) => { apiCallback(value, param, dispatch) };

    if (param && param.id) {
        return (
            <RangeViewController {...others} value={Number.parseFloat(param.text)} paramIdx={param.index} apiCallback={setParamCallback} />
        );
    }

    return null;
} 