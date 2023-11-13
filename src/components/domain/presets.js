/**
 * 
 * @param {*} presets the list of presets to read from
 * @param {*} attr the attribute name to use to intialized the array with
 * @returns 
 */
function initArray(presets, attr) {
    var mySet = new Set();

    presets.forEach(element => {
        mySet.add(element[attr]);
    });

    return Array.from(mySet);
}

export function factoryPresets(value=[]) {
    return {
        presets: value,
        classes: initArray(value, "class"),
        collections: initArray(value, "collection"),
        banks: initArray(value, "bank")
    }
}

export function getInstrumentByName(name="", presets=[]) {
    return  presets.find((preset) => preset.name === name);
}

export function listInstrumentsForCollection(presets = [], collection = null) {
    var instrumetns = new Set();

    presets.forEach( element => (element.collection === collection) ? instrumetns.add(element.instr) : null);

    return Array.from(instrumetns);
}

export function listInstrumentsForClass(presets = [], className = null) {
    var instrumetns = new Set();

    presets.forEach( element => (element.class === className) ? instrumetns.add(element.instr) : null);

    return Array.from(instrumetns);
}

export function listPresetsForBank(presets = [], bank = "") {
    const instrumetns = new Set();

    presets.forEach( element => (element.bank === bank) ? instrumetns.add(element) : null);

    return Array.from(instrumetns);
}

export function listPresetsForInstruments(presets = [], instrName = null) {
    var instrPresets = new Set();

    presets.forEach( element => (element.instr === instrName) ? instrPresets.add(element) : null);

    return Array.from(instrPresets);
}