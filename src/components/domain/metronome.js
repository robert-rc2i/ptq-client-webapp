const tempos = [
    { start: 178, text: "Presto" },
    { start: 168, text: "Presto" },
    { start: 131, text: "Vivace" },
    { start: 110, text: "Allegro" },
    { start: 98, text: "Allegretto" },
    { start: 81, text: "Moderato" },
    { start: 70, text: "Andante" },
    { start: 65, text: "Adagietto" },
    { start: 55, text: "Adagio" },
    { start: 45, text: "Largo" },
    { start: 40, text: "Lento" },
    { start: 20, text: "Grave" }
];

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
        "volume_db": 0
    };
}

export class Metronome {
    constructor({ accentuate=true, bpm=120.0, enabled=false, timesig="4/4", volume_db=0}) {
        this.accentuate = accentuate;
        this.bpm = Number.parseInt(bpm);
        this.enabled = enabled;
        this.timesig = timesig;
        this.volume_db = Number.parseInt(volume_db);
    }

    get tempoAsText() {
        const bpmValue = this.bpm;

        const foundValue = tempos.find((e) => bpmValue >= e.start);
    
        if (foundValue) {
            return foundValue.text;
        }
    
        return "Unknown";
    }

    /**
     * Returns the number of beats per bar
     */
    get beatsPerBar() {
        const sig = this.timesig.split('/');
        if (sig.length>0) {
            return sig[0];
        }
        return null;
    }

    /**
     * Returns the note per beat
     */
    get notePerBeat() {
        const sig = this.timesig.split('/');
        if (sig.length>1) {
            return sig[1];
        }
        return null;
    }
}