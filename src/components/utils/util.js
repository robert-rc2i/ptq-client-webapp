/**
 * Returns a numeric value of the provided string.  If not a string, 400 is returned to signla an error
 * @param {string} numToConvert value as a string
 */
export function convertToNumber(numToConvert) {
    const value = Number.parseInt(numToConvert);
    console.log("status value", value);
    return Number.isNaN(value) ? 400 : value;
}