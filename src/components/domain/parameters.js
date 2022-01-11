export function getParameterValueAsText(id="", params=[]) {
    if (params && params.length) {
        const value = params.find((param) => param.id === id);
        if (value) return value.text
    }
    return "No value found for attribute "+id;
}