import { factoryPresets } from '../domain/presets';
import { ApiHelper } from './RestHelper';

function factoryCommand(cmd="list", params=[], jsonrpc="2.0") {
    return {
        "method": cmd,
        "params": params,
        "jsonrpc": jsonrpc,
        "id": Date.now()
    }
}
export async function postCommand(cmd = "list", params=[], jsonrpc="2.0" ) {
    return ApiHelper.post("", factoryCommand(cmd, params, jsonrpc)).then((apiResp) => {
        if (apiResp.status < 400) {
            return Promise.resolve(apiResp.dataObject);
        }
        return Promise.reject(apiResp.dataObject);
    }).catch((error) => {
        if (error.dataObject) {
            //Api Error
            return Promise.reject(error.dataObject);
        }
        //Network error
        return Promise.reject(error);
    });
}

export async function getAllPresets(dispatch) {
    return await postCommand("getListOfPresets").then((response) => {
            if (dispatch) {
                dispatch({type:"loadedAllPresets", presets: factoryPresets(response.result)});
            }
            return Promise.resolve(factoryPresets(response.result));
        }).catch((err) => {
            console.log("Error loading presets", err);
            return Promise.reject(err);
        });
}

export async function loadPreset({name="", bank= "",dispatch=null}) {
    const result = await postCommand("loadPreset", {name: name, bank: bank, preset_type: "full"});

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
export async function savePreset({name="My new preset", bank="My Presets", dispatch=null}) {
    const result = postCommand("savePreset", {name: name, bank: bank});
    await loadPreset({name: name, bank: bank});

    if (dispatch) {
        refreshCurrentContext(dispatch);
    }

    return result;
}

/**
 * This method reloads the full context of this apps by making multiple calls to Pianoteq.
 * This method should be called on initial app start or after saving a preset.
 */
export async function refreshCurrentContext( dispatch ) {
    const info = await getInfo();
    const params = await getParams();
    const allPresets = await getAllPresets();

    if (dispatch) {
        dispatch({type: "initContext", presets: allPresets, ptqInfo: info, params: params});
    }

    return {info, params, allPresets};
}

export async function getInfo(dispatch) {
    return postCommand("getInfo").then( response => {
        if (dispatch) {
            dispatch({type: "info", ptqInfo: response.result[0]});
        }
        return Promise.resolve(response.result[0]);
    });
}
export async function switchAB(dispatch = null) {
    await postCommand("abSwitch");
    return reloadInstrumentAndItsParameters(dispatch);
}

export async function getParams(dispatch = null, isModified=false) {
    return postCommand("getParameters").then(response => {
        if (dispatch) {
            dispatch({type: "loadParameters", params: response.result, presetModified: isModified});
        }
        return Promise.resolve(response.result);
    })
}

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

/**
 * 
 * @param {*} value A number between -96 and 12
 * @param {*} dispatch dispatcher to update context with new state
 * @returns 
 */
export async function setVolume(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Volume","text":value}]});
    return getParams(dispatch, true);
}

export async function setDynamics(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Dynamics","text":value}]});
    return getParams(dispatch, true);
}

export async function setFxGain(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Post Effect Gain","text":value}]});
    return getParams(dispatch, true);
}

export async function setHardnessForPiano(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Hammer Hardness Piano","text":value}]});
    return getParams(dispatch, true);
}

export async function setHardnessForMezzo(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Hammer Hardness Mezzo","text":value}]});
    return getParams(dispatch, true);
}

export async function setHardnessForForte(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Hammer Hardness Forte","text":value}]});
    return getParams(dispatch, true);
}

export async function setHammerNoise(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Hammer Noise","text":value}]});
    return getParams(dispatch, true);
}

export async function setSoftPedalSmoothing(value, dispatch) {
    await postCommand("setParameters", {"list": [{"id":"Soft Level","text":value}]});
    return getParams(dispatch, true);
}

export async function setDelayEffectSwitch(value, dispatch) {
    console.log("Delay value", value);
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", {"list": [{"id":"Effect[1].Switch","text":textVal}]});
    return getParams(dispatch, true);
}

export async function setEq1EffectSwitch(value, dispatch) {
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", {"list": [{"id":"Effect[2].Switch","text":textVal}]});
    return getParams(dispatch, true);
}

export async function setEq2EffectSwitch(value, dispatch) {
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", {"list": [{"id":"Effect[3].Switch","text":textVal}]});
    return getParams(dispatch, true);
}

export async function setReverb(value, dispatch) {
    const textVal = value ? "On" : "Off";
    await postCommand("setParameters", {"list": [{"id":"Reverb Switch","text":textVal}]});
    return getParams(dispatch, true);
}

export async function recordMidi() {
    return postCommand("midiRecord");
}

export async function stopMidiRecord() {
    return postCommand("midiStop");
}

export async function playMidi() {
    return postCommand("midiPlay");
}

export async function pauseMidi() {
    return postCommand("midiPause");
}

export async function rewindMidi() {
    return postCommand("midiRewind");
}