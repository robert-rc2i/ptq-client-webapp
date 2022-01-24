
/**
 * 
 * @param {} param0 
 * @returns a default object with some default value.  Those values do not represent the current sate of Pianoteq 
 */
export function factoryMetronomeObject() {
    return {
        "accentuate": true,
        "bpm": 120.0,
        "enabled": false,
        "timesig": "4/4",
        "volume_db": 0.0
    };
}

/**
 * 
 * @param {Object} metronome object which must contain the timesig attribute 
 * @returns an array of two.  First value is the # of beats, and the second value is the note. ie.: ["4", "4"] = "4/4"
 */
export function getDetailedTimeSignature({timesig= "4/4"}) {
    return timesig.split('/');
}