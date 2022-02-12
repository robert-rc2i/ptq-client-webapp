import React from 'react';
import { Form } from 'react-bootstrap';

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
    return (
        <div className="form-check form-switch">
            <input {...others} className="form-check-input" type="checkbox" role="switch" id={name} checked={isChecked} onChange={(e) => { onClick(e.target.checked) }} />
            <label className="form-check-label" htmlFor={name}>{label}</label>
        </div>
    )
}

export const RangeViewController = ({ value, dispatch, label = "none", labelValue = true, apiCallback, min = 0, max = 10, step = 0.1, name = "None set", paramIdx, onChange = null, ...others }) => {
    const handleChange = onChange ? onChange : (v) => { dispatch({ type: "setParameter", index: paramIdx, value: v }) };
    const lblValue = labelValue ? `(${value})` : "";
    return (
        <>
            <Form.Label>{`${label} ${lblValue}`}</Form.Label>
            <InputRange {...others} name={name} value={value} min={min} max={max} step={step} onChange={(v) => handleChange(v)} onSetRangeValue={(v) => { apiCallback(v, dispatch); }} />
        </>
    );
}

export const RangeParameterViewController = ({ param = {}, apiCallback, ...others }) => {
    const setParamCallback = (value, dispatch) => { apiCallback(value, param, dispatch) };
    return (
        <RangeViewController {...others} value={param.text} paramIdx={param.index} apiCallback={setParamCallback} />
    )
}

export const NegativeRangeParameterViewController = ({ param = {}, apiCallback, ...others }) => {
    const setParamCallback = (value, dispatch) => { apiCallback(value, param, dispatch) };
    return (
        <RangeViewController {...others} value={Number.parseFloat(param.text)} paramIdx={param.index} apiCallback={setParamCallback} />
    )
} 