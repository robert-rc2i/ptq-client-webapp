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

    //Delay section
    get delaySwitch() {
        return this.paramsByIds.get("Effect[1].Switch");
    }
    get delayMix() {
        return this.paramsByIds.get("Effect[1].Param[1]");
    }
    get delayTime() {
        return this.paramsByIds.get("Effect[1].Param[2]");
    }
    get delayFeedback() {
        return this.paramsByIds.get("Effect[1].Param[3]");
    }
    get delayTone() {
        return this.paramsByIds.get("Effect[1].Param[4]");
    }
    get delayPolarity() {
        return this.paramsByIds.get("Effect[1].Param[5]");
    }

    // Equalizer #1
    get eq1() {
        return this.paramsByIds.get("Effect[2].Switch");
    }
    get eq1Frequency1() {
        return this.paramsByIds.get("Effect[2].Param[1]");
    }
    get eq1Gain1() {
        return this.paramsByIds.get("Effect[2].Param[2]");
    }
    get eq1QFactor1() {
        return this.paramsByIds.get("Effect[2].Param[3]");
    }
    get eq1Frequency2() {
        return this.paramsByIds.get("Effect[2].Param[4]");
    }
    get eq1Gain2() {
        return this.paramsByIds.get("Effect[2].Param[5]");
    }
    get eq1QFactor2() {
        return this.paramsByIds.get("Effect[2].Param[6]");
    }
    get eq1Frequency3() {
        return this.paramsByIds.get("Effect[2].Param[7]");
    }
    get eq1Gain3() {
        return this.paramsByIds.get("Effect[2].Param[8]");
    }

    // Equalizer #2
    get eq2() {
        return this.paramsByIds.get("Effect[3].Switch");
    }
    get eq2Frequency1() {
        return this.paramsByIds.get("Effect[3].Param[1]");
    }
    get eq2Gain1() {
        return this.paramsByIds.get("Effect[3].Param[2]");
    }
    get eq2QFactor1() {
        return this.paramsByIds.get("Effect[3].Param[3]");
    }
    get eq2Frequency2() {
        return this.paramsByIds.get("Effect[3].Param[4]");
    }
    get eq2Gain2() {
        return this.paramsByIds.get("Effect[3].Param[5]");
    }
    get eq2QFactor2() {
        return this.paramsByIds.get("Effect[3].Param[6]");
    }
    get eq2Frequency3() {
        return this.paramsByIds.get("Effect[3].Param[7]");
    }
    get eq2Gain3() {
        return this.paramsByIds.get("Effect[3].Param[8]");
    }

    //Reverb section
    get reverbSwitch() {
        return this.paramsByIds.get("Reverb Switch");
    }
    get reverbMix() {
        return this.paramsByIds.get("Reverb Mix");
    }
    get reverbDuration() {
        return this.paramsByIds.get("Reverb Duration");
    }
    get reverbRoomDimensions() {
        return this.paramsByIds.get("Room Dimensions");
    }
    get reverbPreDelay() {
        return this.paramsByIds.get("Reverb Pre-delay");
    }
    get reverbEarlyReflections() {
        return this.paramsByIds.get("Reverb Early Reflections");
    }
    get reverbTone() {
        return this.paramsByIds.get("Reverb Tone");
    }

    // Note effects
    get nfxAttackEnvelope() {
        return this.paramsByIds.get("Attack Envelope");
    }

    // Note effects - Modulation
    get nfxModulationRate() {
        return this.paramsByIds.get("NFX Lfo Rate");
    }
    get nfxModulationOnsetDuration() {
        return this.paramsByIds.get("NFX Onset Duration");
    }
    get nfxModulationShape() {
        return this.paramsByIds.get("NFX Lfo Shape");
    }
    get nfxModulationShapeSkew() {
        return this.paramsByIds.get("NFX Lfo Skew");
    }
    get nfxModulationPhase() {
        return this.paramsByIds.get("NFX Lfo Phase");
    }
    get nfxModulationPhaseLocked() {
        return this.paramsByIds.get("NFX Lfo Phase Locked");
    }

    //Note effects - Vibrato
    get nfxVibratoDepth() {
        return this.paramsByIds.get("NFX Vibrato");
    }
    get nfxVibratoOffset() {
        return this.paramsByIds.get("NFX Vibrato Offset");
    }

    //Note effects - Tremolo
    get nfxTremoloDepth() {
        return this.paramsByIds.get("NFX Tremolo Depth");
    }
    get nfxTremoloPhase() {
        return this.paramsByIds.get("NFX Tremolo Phase");
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

    //Spectrum profile
    get spectrumProfile1() {
        return this.paramsByIds.get("Profil[1]");
    }

    get spectrumProfile2() {
        return this.paramsByIds.get("Profil[2]");
    }

    get spectrumProfile3() {
        return this.paramsByIds.get("Profil[3]");
    }

    get spectrumProfile4() {
        return this.paramsByIds.get("Profil[4]");
    }

    get spectrumProfile5() {
        return this.paramsByIds.get("Profil[5]");
    }

    get spectrumProfile6() {
        return this.paramsByIds.get("Profil[6]");
    }

    get spectrumProfile7() {
        return this.paramsByIds.get("Profil[7]");
    }

    get spectrumProfile8() {
        return this.paramsByIds.get("Profil[8]");
    }

    //Piano action
    get damperNoise() {
        return this.paramsByIds.get("Damper Noise");
    }

    get damperPosition() {
        return this.paramsByIds.get("Damper Position");
    }

    get lastDamperNote() {
        return this.paramsByIds.get("Last Damper");
    }

    get sustainPedalNoise() {
        return this.paramsByIds.get("Pedal Noise");
    }

    get keyReleaseNoise() {
        return this.paramsByIds.get("Key Release Noise");
    }

    get damperDuration() {
        return this.paramsByIds.get("Damping Duration");
    }

    get mute() {
        return this.paramsByIds.get("Mute");
    }

    //Mallet bounce
    get bounceSwitch() {
        return this.paramsByIds.get("Bounce Switch");
    }
        
    get bounceSync() {
        return this.paramsByIds.get("Bounce Sync");
    }

    get bounceDelay() {
        return this.paramsByIds.get("Bounce Delay");
    }

    get bounceDelayLoss() {
        return this.paramsByIds.get("Bounce Delay Loss");
    }

    get bounceVelocity() {
        return this.paramsByIds.get("Bounce Velocity Sensitivity");
    }

    get bounceVelocityLoss() {
        return this.paramsByIds.get("Bounce Velocity Loss");
    }

    get bounceHumanization() {
        return this.paramsByIds.get("Bounce Humanization");
    }
}