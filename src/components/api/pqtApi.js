import { factoryMetronomeObject } from '../domain/metronome';
import { factoryMidiSequencerObject } from '../domain/midiSequencer';
import { factoryPresets } from '../domain/presets';
import { versionIsSupported } from '../utils/util';
import { ApiHelper, NetworkError } from './RestHelper';

/**
 * 
 * @param {Object} response object from the API
 * @returns true if the response api is OK, otherwise false.
 */
function isResponseOk(resp) {
    return !resp.error;
}

function factoryCommand(cmd = "list", params = [], jsonrpc = "2.0") {
    return {
        "method": cmd,
        "params": params,
        "jsonrpc": jsonrpc,
        "id": Date.now()
    }
}
export async function postCommand(cmd = "list", params = [], jsonrpc = "2.0") {
    return ApiHelper.post("", factoryCommand(cmd, params, jsonrpc)).then((apiResp) => {
        if (apiResp.status < 400) {
            return Promise.resolve(apiResp.dataObject);
        }
        console.log("API: Error", apiResp, apiResp.dataObject);
        return Promise.reject(apiResp.dataObject);
    }).catch((error) => {
        if (error.dataObject && error.dataObject.error) {
            //Api Error
            const apiError = new NetworkError(error.dataObject.error.code, error.dataObject.error.message);
            console.log("API: Error", apiError);
            return Promise.reject(apiError);
        }
        //Network error
        const netError = new NetworkError(-1, error.toString());
        console.log("Network: Error", netError);
        return Promise.reject(netError);
    });
}

/**
 * Load the next preset from Pianoteq
 * @param {*} dispatch 
 * @returns the reponse from the API call
 */
export async function loadNextPreset(dispatch) {
    return postCommand("nextPreset").then((response)=>{
        if (isResponseOk(response) && dispatch) {
            getInfo(dispatch).then(()=> getParams(dispatch));
        }
    });
}

/**
 * Load the previous preset from Pianoteq
 * @param {} dispatch 
 * @returns the response from the api call
 */
export async function loadPreviousPreset(dispatch) {
    return postCommand("prevPreset").then((response)=>{
        if (isResponseOk(response) && dispatch) {
            getInfo(dispatch).then(()=> getParams(dispatch));
            
        }
    });
}

export async function getMetronomeState(dispatch) {
    return postCommand("getMetronome").then((response) => {
        if (dispatch) {
            dispatch({ type: "loadMetronomeState", value: response.result[0] });
        }
        return Promise.resolve(response.result[0]);
    });
}

export async function getAllPresets(dispatch) {
    return postCommand("getListOfPresets").then((response) => {
        if (dispatch) {
            dispatch({ type: "loadedAllPresets", presets: factoryPresets(response.result) });
        }
        return Promise.resolve(factoryPresets(response.result));
    });
}

export async function loadPreset({ name = "", bank = "", dispatch = null }) {
    return postCommand("loadPreset", { name: name, bank: bank, preset_type: "full" }).then(() => {
        if (dispatch) {
            getInfo(dispatch).then(()=> getParams(dispatch));
        }
    });
}

export async function savePreset({ name = "My new preset", bank = "My Presets", dispatch = null }) {
    return postCommand("savePreset", { name: name, bank: bank ? bank : "My Presets" }).then(() => {
        if (dispatch) {
            //Need to refresh the context as this might be a new preset and we need to populate the navigation menu
            loadPreset({name: name, bank: bank, dispatch}).then(()=>refreshCurrentContext(dispatch));
        }
    });
}

/**
 * This method reloads the full context of this apps by making multiple calls to Pianoteq.
 * This method should be called on initial app start or after saving a preset.
 */
export async function refreshCurrentContext(dispatch) {
    let params = [], allPresets = [], apiError = null, metronome, seqState;
    const info = await getInfo().then((i) => {
        return i;
    }).catch((e) => {
        apiError = e;
        return null;
    });

    if (info) {
        params = await getParams();
        allPresets = await getAllPresets();
        metronome = versionIsSupported("7.5.3", info.version) ? await getMetronomeState() : factoryMetronomeObject();
        seqState = versionIsSupported("7.5.3", info.version) ? await getMidiSequencerState() : factoryMidiSequencerObject();
    }

    if (dispatch) {
        if (apiError) {
            dispatch({ type: "apiError", error: apiError });
            return { info, params, allPresets };
        }
        dispatch({ type: "initContext", presets: allPresets, ptqInfo: info, params: params, error: null, metronome: metronome, midiState: seqState });
    }

    return { info, params, allPresets };
}

export async function getInfo(dispatch) {
    return postCommand("getInfo").then(response => {
        if (dispatch) {
            dispatch({ type: "info", ptqInfo: response.result[0] });
        }
        return Promise.resolve(response.result[0]);
    }).catch(error => {
        return Promise.reject(error);
    });
}

export async function switchAB(dispatch = null) {
    return postCommand("abSwitch").then(() => {
        if (dispatch) {
            getInfo(dispatch).then(()=> getParams(dispatch));
        }
    });
}

export async function getParams(dispatch = null, isModified = false) {
    return postCommand("getParameters").then(response => {
        if (dispatch) {
            dispatch({ type: "loadParameters", params: response.result, presetModified: isModified });
        }
        return Promise.resolve(response.result);
    }).catch(error => {
        const netError = new NetworkError(-1, error.toString());
        console.log("Error", netError);
        return Promise.reject(netError);
    });
}

/**
 * Get the current instrument in Pianoteq UI.  Usefull when things has changed on the Pianoteq side
 * @param {*} dispatch 
 */
export async function reloadInstrumentAndItsParameters(dispatch = null) {
    return postCommand("resetPreset").then(() => {
        getInfo(dispatch).then(()=> getParams(dispatch));
    })
}

export async function setMetronome(value, dispatch) {
    return postCommand("setMetronome", {
        "accentuate": value.accentuate,
        "bpm": Number.parseFloat(value.bpm),
        "enabled": value.enabled,
        "timesig": value.timesig,
        "volume_db": Number.parseFloat(value.volume_db)
    }).then(() => {
        if (dispatch) {
            dispatch({ type: "setMetronome", value: value });
        }
        return Promise.resolve(value);
    });
}

/**
 * 
 * @param {Boolean} value to convert as text
 * @param {*} param the parameter to set the value to 
 * @param {*} dispatch 
 * @returns the result of the api call
 */
export async function setParameterSwitchValue(value, param = {}, dispatch) {
    const textVal = value ? "On" : "Off";
    return setParameterAsText(textVal, param, dispatch);
}

/**
 * 
 * @param {*} value to set
 * @param {*} param to update
 * @param {*} dispatch 
 * @returns the updated parameters
 */
export async function setParameterAsText(value, param = {}, dispatch) {
    return postCommand("setParameters", { "list": [{ "id": param.id, "text": value }] }).then(() => {
        if (dispatch) {
            getParams(dispatch, true)
        }
    });
}

export async function getMidiSequencerState(dispatch) {
    return postCommand("getSequencerInfo").then((v) => {
        if (dispatch) {
            dispatch({ type: "setSequencerState", value: v.result[0] })
        }
        return v?.result[0];
    });
}

export async function recordMidi(reducer) {
    return postCommand("midiRecord").then(() => {
        if (reducer) {
            return getMidiSequencerState(reducer);
        }
        return factoryMidiSequencerObject();
    });
}

export async function stopMidiRecord(reducer) {
    return postCommand("midiStop").then(() => {
        if (reducer) {
            return getMidiSequencerState(reducer);
        }
        return factoryMidiSequencerObject();
    });
}

export async function playMidi(reducer) {
    return postCommand("midiPlay").then(() => {
        if (reducer) {
            return getMidiSequencerState(reducer);
        }
        return factoryMidiSequencerObject();
    });
}

export async function pauseMidi(reducer) {
    return postCommand("midiPause").then(() => {
        if (reducer) {
            return getMidiSequencerState(reducer);
        }
        return factoryMidiSequencerObject();
    });
}

export async function rewindMidi(reducer) {
    return postCommand("midiRewind").then(() => {
        if (reducer) {
            return getMidiSequencerState(reducer);
        }
        return factoryMidiSequencerObject();
    });
}