/**
 * Returns a numeric value of the provided string.  If not a string, 400 is returned to signla an error
 * @param {string} numToConvert value as a string
 */
export function convertToNumber(numToConvert) {
    const value = Number.parseInt(numToConvert);
    return Number.isNaN(value) ? 400 : value;
}

/**
 * 
 * @param {String} requiredVersion is the version that is minimaly required
 * @param {String} currentVersion is the provided current version to compare against
 * @returns true if the required version is equals or lower than the provided current version
 */
export function versionIsSupported(requiredVersion="7.5.3", currentVersion="1.0.0") {
    const re = /\./gi;
    return (Number.parseInt(currentVersion.replace(re, '')) - Number.parseInt(requiredVersion.replace(re, ''))) >= 0;
}