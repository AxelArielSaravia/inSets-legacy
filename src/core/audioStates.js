import { random } from "./utils.js";
/** 
 * @typedef {{
 *  title: string,
 *  pannerDisable: boolean,
 *  delayDisable: boolean,
 *  filterDisable: boolean,
 *  playbackrateDisable: boolean,
 * }} audioState
 */

//!!!!!!!!!!!!!!!!!!
//! REVEER TODO !!!!
//!!!!!!!!!!!!!!!!!!

/**
 * @class AudioPanner
 * @param {AudioContext} audioCtx
 */
function AudioPanner(audioCtx) {
    //DEFAULT VALUES
    if (audioCtx.listener.positionX) {
        audioCtx.listener.positionX.value = 6;
        audioCtx.listener.positionY.value = 6;
        audioCtx.listener.positionZ.value = 6;
    } else {
        audioCtx.listener.setPosition(6,6,6);
    }

    const panner = audioCtx.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;

    /**
     * @param {number} positionX 
     * @param {number} positionY 
     * @param {number} positionZ 
     */
    this.enable = function(positionX = 6, positionY = 6, positionZ = 5) {
        if (typeof positionX === "number" && typeof positionY === "number" && typeof positionZ === "number") {
            if (panner.positionX) {
                panner.positionX = positionX;
                panner.positionY = positionY;
                panner.positionZ = positionZ;
            } else {
                panner.setPosition(positionX,positionY,positionZ);
            }
        }
    }

    this.disable = function() {
        if (panner.positionX) {
            panner.positionX = 6;
            panner.positionY = 6;
            panner.positionZ = 5;
        } else {
            panner.setPosition(6, 6, 5);
        }
    }
}

/**
 * @class AudioState
 * @param {ASD} tle 
 * @param {boolean} pannerD 
 * @param {boolean} delayD 
 * @param {boolean} filterD 
 * @param {boolean} rateD 
 * @return {audioState}
 */
function AudioState(tle, pannerD, delayD, filterD, rateD) {
    let pannerDisable = typeof pannerD === "boolean" ? pannerD : false;
    let delayDisable = typeof delayD === "boolean" ? delayD : false;
    let filterDisable = typeof filterD === "boolean" ? filterD : false;
    let playbackrateDisable = typeof rateD === "boolean" ? rateD : false;

    Object.defineProperties(this, {
        "title": {
            value: tle,
            enumerable: true
        },
        "pannerDisable": {
            get: function() { return pannerDisable },
            set: function(bool) { if (typeof bool === "boolean") pannerDisable = bool },
            enumerable: true
        },
        "delayDisable": {
            get: function() { return delayDisable },
            set: function(bool) { if (typeof bool === "boolean") delayDisable = bool },
            enumerable: true
        },
        "filterDisable": {
            get: function() { return filterDisable },
            set: function(bool) { if (typeof bool === "boolean") filterDisable = bool },
            enumerable: true
        },
        "playbackrateDisable": {
            get: function() { return playbackrateDisable },
            set: function(bool) { if (typeof bool === "boolean") playbackrateDisable = bool },
            enumerable: true
        },
    });
}


function createAudioState(title, pannerDisable, delayDisable, filterDisable, playbackrateDisable) { 
    return new AudioState(title, pannerDisable, delayDisable, filterDisable, playbackrateDisable); 
}


