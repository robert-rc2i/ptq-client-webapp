/**
 * 
 * @returns an empty MidiSequencer state object
 */
export function factoryMidiSequencerObject() {
    return {
        "description": "No description",
        "duration": 0.0,
        "is_paused": false,
        "is_playing": false,
        "is_recording": false,
        "name": "No file name",
        "path": "(none)",
        "playback_speed": 1.0,
        "position": 0.0
    };
}