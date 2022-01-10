import React, { createContext, useContext, useReducer } from 'react';
import { factoryPresets, getInstrumentByName } from '../domain/presets';

/**
 * 
 * @param {*} presets 
 * @param {*} currPreset 
 * @param {*} currParams 
 * @param {*} info 
 * @returns 
 */
export const factoryInitialState = ({presets = factoryPresets(), currPreset={}, currParams=[], info={}}) => {
    return {
        allInstruments: presets,
        currentPreset: currPreset,
        currentParameters: currParams ? currParams : [],
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
            return factoryInitialState({
                presets: action.presets, 
                currPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), action.presets.presets), 
                info: action.ptqInfo, 
                currParams: action.params});
        case "refresh":
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),
                currentParameters: action.params
            }
        case "info":
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),

            }
        case "loadParameters":
            return {
                ...currentState,
                currentParameters: action.params,
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