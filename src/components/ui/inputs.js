import React from 'react';

/**
 * 
 * @param {onChange} function A callback function when the slider is being moved
 * @param {onSetRangeValue} function A callback function when the slider value is set, happens when the user release the mouse button or after the touch event 
 * @returns 
 */
export const InputRange = ({ onChange, onSetRangeValue, ...others }) => {
    return (
        <input {...others} type="range" className="form-range" onChange={(e) => { e.preventDefault(); onChange(e.target.value) }} onTouchEnd={(e) => { e.preventDefault(); onSetRangeValue(e.target.value) }} onClick={(e) => { e.preventDefault(); onSetRangeValue(e.target.value) }} />
    )
}

export const InputSwitch = ({ name="none", label, isChecked=false, onClick}) => {
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id={name} defaultChecked={isChecked} onClick={(e) => { onClick(e.target.checked)}}/>
            <label className="form-check-label" htmlFor={name}>{label}</label>
        </div>
    )
}