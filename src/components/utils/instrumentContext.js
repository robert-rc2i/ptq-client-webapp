import React, { createContext, useContext, useReducer } from 'react';
import { factoryMetronomeObject } from '../domain/metronome';
import { factoryMidiSequencerObject } from '../domain/midiSequencer';
import { factoryPresets, getInstrumentByName } from '../domain/presets';

/**
 * 
 * @param {*} presets 
 * @param {*} currPreset 
 * @param {*} currParams 
 * @param {*} info 
 * @returns 
 */
export const factoryInitialState = ({presets = factoryPresets(), currPreset={}, currParams=[], info={}, isPresetModified=false, metronome=factoryMetronomeObject(), midiState=factoryMidiSequencerObject()}) => {
    return {
        allInstruments: presets,
        currentPreset: currPreset,
        currentParameters: currParams,
        ptqInfo: info,
        isPresetModified: isPresetModified,
        metronome: metronome,
        midiState: midiState
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
        case "loadInstrument":
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),
                currentParameters: action.params,
                isPresetModified: false
            }
        case "savedPreset":
            return {
                ...currentState,
                allInstruments: action.presets,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),
                currentParameters: action.params,
                isPresetModified: false
            }
        case "initContext":
            return factoryInitialState({
                presets: action.presets, 
                currPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), action.presets.presets), 
                info: action.ptqInfo, 
                currParams: action.params,
                metronome: action.metronome,
                midiState: action.midiState
            });
        case "setMetronome":
            return {
                ...currentState,
                metronome: action.value
            }
        case "apiError": {
            return {
                ...factoryInitialState({}),
                error: action.error
            } 
        }
        case "refresh":
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),
                currentParameters: action.params
            }
        case "info":
            //The replace ("My Presets") is required for the old API 7.5.2
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),

            }
        case "loadParameters":
            return {
                ...currentState,
                currentParameters: action.params,
                isPresetModified: action.presetModified
            }
        case "setParameter":
            const newState = {
                ...currentState,
                isPresetModified: true
            }
            //Assign new value to the desired param
            newState.currentParameters[action.index].text = action.value;

            return newState;
        case "setSequencerState": {
            return {
                ...currentState,
                midiState: action.value
            }
        }
        case "cancelSave": {
            return {
                ...currentState,
                isPresetModified: false
            }
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