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
    const response = await postCommand("nextPreset");

    if (isResponseOk(response) && dispatch) {
        dispatch({type: "cancelSave"});
        reloadInstrumentAndItsParameters(dispatch);
    } 
    return response;
}

/**
 * Load the previous preset from Pianoteq
 * @param {} dispatch 
 * @returns the response from the api call
 */
export async function loadPreviousPreset(dispatch) {
    const response = await postCommand("prevPreset");

    if (isResponseOk(response) && dispatch) {
        dispatch({type: "cancelSave"});
        reloadInstrumentAndItsParameters(dispatch);
    } 
    return response;
}

export async function getMetronomeState(dispatch) {
    return await postCommand("getMetronome").then((response) => {
        if (dispatch) {
            dispatch({ type: "loadMetronomeState", value: response.result[0] });
        }
        return Promise.resolve(response.result[0]);
    }).catch(err => {
        return err;
    });
}

export async function getAllPresets(dispatch) {
    return await postCommand("getListOfPresets").then((response) => {
        if (dispatch) {
            dispatch({ type: "loadedAllPresets", presets: factoryPresets(response.result) });
        }
        return Promise.resolve(factoryPresets(response.result));
    }).catch(error => {
        return error;
    });
}

export async function loadPreset({ name = "", bank = "", dispatch = null }) {
    const result = await postCommand("loadPreset", { name: name, bank: bank, preset_type: "full" });

    if (dispatch) {
        const info = await getInfo();
        const params = await getParams();

        dispatch({
            type: "loadInstrument",
            params: params,
            ptqInfo: info
        });
    }
    return result;
}
export async function savePreset({ name = "My new preset", bank = "My Presets", dispatch = null }) {
    const result = postCommand("savePreset", { name: name, bank: bank });
    await loadPreset({ name: name, bank: bank });

    if (dispatch) {
        refreshCurrentContext(dispatch);
    }

    return result;
}

/**
 * This method reloads the full context of this apps by making multiple calls to Pianoteq.
 * This method should be called on initial app start or after saving a preset.
 */
export async function refreshCurrentContext(dispatch) {
    let params = [], allPresets = [], apiError = null, metronome, seqState;
    const info = await getInfo().then(async (i) => {
        return Promise.resolve(i);
    }).catch((e) => {
        apiError = e;
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
    await postCommand("abSwitch");
    return reloadInstrumentAndItsParameters(dispatch);
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
    if (dispatch) {
        const info = await getInfo();
        const params = await getParams();
        dispatch({
            type: "refresh",
            params: params,
            ptqInfo: info
        })
    }
}

export async function setMetronome(value, dispatch) {
    console.log("Metronome:", value);
    return await postCommand("setMetronome", {
        "accentuate": value.accentuate,
//        "bpm": Number.parseFloat(value.bpm),
        "enabled": value.enabled,
        "timesig": value.timesig
 //       "volume_db": Number.parseFloat(value.volume_db)
    }).then((response) => {
        if (dispatch) {
            dispatch({ type: "setMetronome", value: value });
        }
        return Promise.resolve(value);
    }).catch(err => {
        return err;
    });
}

/**
 * 
 * @param {*} value A number between -96 and 12
 * @param {*} dispatch dispatcher to update context with new state
 * @returns 
 */
export async function setVolume(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Volume", "text": value }] });
    return getParams(dispatch, true);
}

export async function setDynamics(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Dynamics", "text": value }] });
    return getParams(dispatch, true);
}

export async function setFxGain(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Post Effect Gain", "text": value }] });
    return getParams(dispatch, true);
}

export async function setHardnessForPiano(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Hammer Hardness Piano", "text": value }] });
    return getParams(dispatch, true);
}

export async function setHardnessForMezzo(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Hammer Hardness Mezzo", "text": value }] });
    return getParams(dispatch, true);
}

export async function setHardnessForForte(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Hammer Hardness Forte", "text": value }] });
    return getParams(dispatch, true);
}

export async function setHammerNoise(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Hammer Noise", "text": value }] });
    return getParams(dispatch, true);
}

export async function setSoftPedalSmoothing(value, dispatch) {
    await postCommand("setParameters", { "list": [{ "id": "Soft Level", "text": value }] });
    return getParams(dispatch, true);
}

export async function setDelayEffectSwitch(value, dispatch) {
    console.log("Delay value", value);
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", { "list": [{ "id": "Effect[1].Switch", "text": textVal }] });
    return getParams(dispatch, true);
}

export async function setEq1EffectSwitch(value, dispatch) {
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", { "list": [{ "id": "Effect[2].Switch", "text": textVal }] });
    return getParams(dispatch, true);
}

export async function setEq2EffectSwitch(value, dispatch) {
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", { "list": [{ "id": "Effect[3].Switch", "text": textVal }] });
    return getParams(dispatch, true);
}

export async function setReverb(value, dispatch) {
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", { "list": [{ "id": "Reverb Switch", "text": textVal }] });
    return getParams(dispatch, true);
}

export async function getMidiSequencerState(dispatch) {
    return  await postCommand("getSequencerInfo").then((v) => {
        if (dispatch) {
            dispatch({type: "setSequencerState", value: v.result[0]})
        }
        return Promise.resolve(v.result[0]);
    }).catch((err) => {
        return err;
    })
}

export async function recordMidi(reducer) {
    await postCommand("midiRecord");
    if (reducer) {
        return getMidiSequencerState(reducer);
    }
    return factoryMidiSequencerObject();
}

export async function stopMidiRecord(reducer) {
    await postCommand("midiStop");
    if (reducer) {
        return getMidiSequencerState(reducer);
    }
    return factoryMidiSequencerObject();
}

export async function playMidi(reducer) {
    await postCommand("midiPlay");
    if (reducer) {
        return getMidiSequencerState(reducer);
    }
    return factoryMidiSequencerObject();
}

export async function pauseMidi(reducer) {
    await postCommand("midiPause");
    if (reducer) {
        return getMidiSequencerState(reducer);
    }
    return factoryMidiSequencerObject();
}

export async function rewindMidi(reducer) {
    await postCommand("midiRewind");
    if (reducer) {
        return getMidiSequencerState(reducer);
    }
    return factoryMidiSequencerObject();
}