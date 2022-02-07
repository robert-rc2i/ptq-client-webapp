export function getSwitchToBooleanValue(switchValue) {
    const v = switchValue && switchValue === "On" ? true : false;
    return v;
}

export class InstrumentParameters {
    constructor(params = []) {
        this.parameters = params;
        this.paramsByIds = new Map(this.parameters.map((e) => { return [e.id, e] }));
    }

    //Output parameters
    get dynamics() {
        return this.paramsByIds.get("Dynamics");
    }

    get volume() {
        return this.paramsByIds.get("Volume");
    }

    get outputMode() {
        return this.paramsByIds.get("Output Mode");
    }

    get condition() {
        return this.paramsByIds.get("Condition");
    }

    get lid() {
        return this.paramsByIds.get("Lid")
    }

    get isLidOff() {
        return this.lid.text === "Off";
    }

    get lidPosition() {
        return this.paramsByIds.get("Lid Position")
    }

    // Voicing parameters
    get hammerHardnessPiano() {
        return this.paramsByIds.get("Hammer Hardness Piano");
    }

    get hammerHardnessMezzo() {
        return this.paramsByIds.get("Hammer Hardness Mezzo");
    }

    get hammerHardnessForte() {
        return this.paramsByIds.get("Hammer Hardness Forte");
    }

    get hammerNoise() {
        return this.paramsByIds.get("Hammer Noise");
    }

    get strikePoint() {
        return this.paramsByIds.get("Strike Point");
    }

    get softPedalSmoothing() {
        return this.paramsByIds.get("Soft Level");
    }

    // Effects parameters
    get postFxGain() {
        return this.paramsByIds.get("Post Effect Gain");
    }

    get delay() {
        return this.paramsByIds.get("Effect[1].Switch");
    }

    get eq1() {
        return this.paramsByIds.get("Effect[2].Switch");
    }
    
    get eq2() {
        return this.paramsByIds.get("Effect[3].Switch");
    }
    
    get reverb() {
        return this.paramsByIds.get("Reverb Switch");
    }

    // Design parameters
    get sbImpedance() {
        return this.paramsByIds.get("Impedance");
    }
    
    get sbCutoff() {
        return this.paramsByIds.get("Cutoff Freq");
    }
    
    get sbQFactor() {
        return this.paramsByIds.get("Q Factor");
    }
    
    get stringLength() {
        return this.paramsByIds.get("String Length");
    }
    
    get sympatheticResonance() {
        return this.paramsByIds.get("Sympathetic Resonance");
    }
    
    get duplexScale() {
        return this.paramsByIds.get("Duplex Scale Resonance");
    }
    
    get bloomingEnergy() {
        return this.paramsByIds.get("Blooming Energy");
    }
    
    get bloomingInertia() {
        return this.paramsByIds.get("Blooming Inertia");
    }

    //Piano action
    get damperNoise() {
        return this.paramsByIds.get("Damper Noise");
    }

    get keyReleaseNoise() {
        return this.paramsByIds.get("Key Release Noise");
    }

    get sustainPedalNoise() {
        return this.paramsByIds.get("Pedal Noise");
    }
}