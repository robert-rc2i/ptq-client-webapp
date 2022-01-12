export function getParameterValueAsText(id="", params=[]) {
    if (params && params.length) {
        const value = params.find((param) => param.id === id);
        if (value) return value.text
    }
    return "No value found for attribute "+id;
}

export function getSwitchToBooleanValue(switchValue) {
    const v = switchValue && switchValue === "On" ? true : false;
    return v;
}

export function getFxGain(params=[]) {
    return getParameterValueAsText("Post Effect Gain", params);
}
export function getDelay(params=[]) {
    return getSwitchToBooleanValue(getParameterValueAsText("Effect[1].Switch", params));
}

export function getEq1(params=[]) {
    return getSwitchToBooleanValue(getParameterValueAsText("Effect[2].Switch", params));
}

export function getEq2(params=[]) {
    return getSwitchToBooleanValue(getParameterValueAsText("Effect[3].Switch", params));
}

export function getReverb(params=[]) {
    return getSwitchToBooleanValue(getParameterValueAsText("Reverb Switch", params));
}

export function getHammerHardnessPiano(params=[]) {
    return getParameterValueAsText("Hammer Hardness Piano", params);
}
export function getHammerHardnessMezzo(params=[]) {
    return getParameterValueAsText("Hammer Hardness Mezzo", params);
}
export function getHammerHardnessForte(params=[]) {
    return getParameterValueAsText("Hammer Hardness Forte", params);
}

export function getHammerNoise(params=[]) {
    return getParameterValueAsText("Hammer Noise", params );
}

export function getStrikePoint(params=[]) {
    return getParameterValueAsText("Strike Point", params );
}

export function getSoftPedalSmoothing(params=[]) {
    return getParameterValueAsText("Soft Level", params);
}