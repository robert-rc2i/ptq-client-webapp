import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { factoryMetronomeObject, Metronome } from '../domain/metronome';
import { factoryMidiSequencerObject } from '../domain/midiSequencer';
import { InstrumentParameters } from '../domain/parameters';
import { factoryPresets, getInstrumentByName } from '../domain/presets';
import * as pqtApi from '../api/pqtApi';

/**
 * 
 * @param {*} presets 
 * @param {*} currPreset 
 * @param {*} currParams 
 * @param {*} info 
 * @returns 
 */
export const factoryInitialState = ({ presets = factoryPresets(), currPreset = {}, info = {}, currParams = [], isPresetModified = false, metronome = factoryMetronomeObject(), midiState = factoryMidiSequencerObject() }) => {
    return {
        allInstruments: presets,
        currentPreset: currPreset,
        instrumentParameters: new InstrumentParameters(currParams),
        ptqInfo: info,
        isPresetModified: isPresetModified,
        metronome: new Metronome(metronome),
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
    switch (action.type) {
        case "loadInstrument":
            return {
                ...currentState,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),
                instrumentParameters: new InstrumentParameters(action.params),
                isPresetModified: false
            }
        case "savedPreset":
            return {
                ...currentState,
                allInstruments: action.presets,
                ptqInfo: action.ptqInfo,
                currentPreset: getInstrumentByName(action.ptqInfo.current_preset.name.replace("My Presets/", ""), currentState.allInstruments.presets),
                instrumentParameters: new InstrumentParameters(action.params),
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
                metronome: new Metronome(action.value)
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
                instrumentParameters: new InstrumentParameters(action.params)
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
                instrumentParameters: new InstrumentParameters(action.params),
                isPresetModified: action.presetModified
            }
        case "setParameter":
            const newState = {
                ...currentState,
                isPresetModified: true
            }
            //Assign new value to the desired param
            newState.instrumentParameters.parameters[action.index].text = action.value;

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
            console.error("Unknown reducer action", action);
            break;
    }
}

export const CurrentInstrumentContext = createContext(factoryInitialState({}));

export const CurrentInstrumentContextProvider = ({ children }) => {
    const ctx = useReducer(defaultReducer, factoryInitialState({}));
    const [state, reducer] = ctx;
    useEffect(() => {
        if (!state.isInitialized) {
            pqtApi.refreshCurrentContext(reducer);
        }
    }, []);

    //console.debug("CurrentInstrumentContextProvider: Ctx", state);

    return (
        <CurrentInstrumentContext.Provider value={ctx}>
            {children}
        </CurrentInstrumentContext.Provider>
    );
}

export const useInstrumentContext = () => useContext(CurrentInstrumentContext);