export function getParameterValueAsText(id="", params=[]) {
    if (params && params.length) {
        const value = params.find((param) => param.id === id);
        if (value) return value.text
    }
    return "No value found for attribute "+id;
}

export function getSwitchToBooleanValue(switchValue) {
    const v = switchValue && switchValue === "On" ? true : false;
    console.log("Switch value:", switchValue, v);
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