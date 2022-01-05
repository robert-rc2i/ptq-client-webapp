import React, { createContext, useContext, useReducer } from 'react';
import { getInstrumentByName } from '../domain/presets';

/**
 * 
 * @param {*} presets 
 * @param {*} currPreset 
 * @param {*} currParams 
 * @param {*} info 
 * @returns 
 */
export const factoryInitialState = ({presets = [], currPreset={}, currParams=[], info={}}) => {
    return {
        allInstruments: presets,
        currentPreset: currPreset,
        currentParameters: currParams,
        ptqInfo: info
    }
}

/**
 * Reducer for this context
 * @param {*} currentState 
 * @param {*} action object that must have a type attribute
 * @returns 
 */
const defaultReducer = (currentState, action) => {
    console.log("Reducder command:", action);
    switch (action.type) {
        case "loadedInstrument":
            return {
                ...currentState,
                currentPreset: action.value
            }
        case "initContext":
            return factoryInitialState({presets: action.presets, currPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), action.presets.presets), info: action.ptqInfo});
        case "info":
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets)
            }
        default:
            break;
    }
} 

export const CurrentInstrumentContext = createContext(factoryInitialState({}));

export const CurrentInstrumentContextProvider = ({initState, children }) => {
    return (
        <CurrentInstrumentContext.Provider value={useReducer(defaultReducer, initState)}>
            {children}
        </CurrentInstrumentContext.Provider>
    );
}

export const useInstrumentContext = () => useContext(CurrentInstrumentContext);