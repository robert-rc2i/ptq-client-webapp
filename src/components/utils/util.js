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
    return (Number.parseInt(currentVersion.replace(re, '').substring(0,3)) - Number.parseInt(requiredVersion.replace(re, '').substring(0,3))) >= 0;
}

/**
 * Function utility to wrap another funciton that requires only the last call to be performed.  The last called is dertermined by a timeout.
 * @param {function} fn is the function to call once the timeout is triggered
 * @param {Array} ars an array of arguments to pass to the function
 * @param {int} timeout to trigger the function, in milli-seconds.
 */
export function debounce(fn, args=[], timeout, timerId) {
    console.log("Timer id:", timerId);

    //Clear the timer if any. That way any pending timer won't trigger the function
    clearTimeout(timerId);

    timerId = setTimeout(() => {
        console.log("Debounce: Calling function...");
        fn.apply(this, args);
    }, timeout);

    return timerId;
}