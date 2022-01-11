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