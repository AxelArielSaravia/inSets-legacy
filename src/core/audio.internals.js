//@ts-check
import globalState from "../state/globalState.js";
import {delayLimits, filterLimits} from "../state/limits.js";

import {rToFade} from "./maps.js";
import {flipCoin, wait} from "./utils.js";
import {random} from "../utils.js";
import {
    rToFeedback,
    rToFrequency,
    rToPanner,
    rToPlaybackRate,
    rToQ,
    rToTime
} from "./maps.js";

import {audioActions} from "../slices/audio.js";

const GAIN_0 = 0.0001;

/**
@type {(audioState: AudioState) => undefined | Panic}*/
function createAudioRandomChain(audioState) {
    const audioContext = globalState.audioContext;
    if (audioContext === undefined) {
        throw new Error("PANIC!!! The audio context disapears. We can not run the app.");
    }
    //main gains
    const inputGain = audioContext.createGain();
    const outputGain = audioContext.createGain();
    //atenuate the general volume
    inputGain.gain.value = 0.8;

    //set min gain value to create a fadeIn later
    outputGain.gain.value = GAIN_0;

    //The variable that we use for the connections chain
    /**@type {any} */
    let prev = inputGain;
    //PANNER
    if (!audioState.pannerIsDisable) {
        const PANNER = audioContext.createPanner();
        PANNER.coneInnerAngle = 360;
        PANNER.coneOuterAngle = 0;
        PANNER.coneOuterGain = 0;
        PANNER.distanceModel = "inverse";
        PANNER.maxDistance = 10000;
        PANNER.orientationX.value = 0;
        PANNER.orientationY.value = 1;
        PANNER.orientationZ.value = 0;
        PANNER.panningModel = "HRTF";
        PANNER.refDistance = 1;
        PANNER.positionX.value = (
            rToPanner(random(globalState.panner.xMin, globalState.panner.xMax)) / 10
        );
        PANNER.positionY.value = (
            rToPanner(random(globalState.panner.yMin, globalState.panner.yMax)) / 10
        );
        PANNER.positionZ.value = (
            -(random(globalState.panner.zMin, globalState.panner.zMax) / 10)
        );
        prev.connect(PANNER); //input is PannerNode
        prev = PANNER;
    }
    //FILTER
    if (flipCoin() && !audioState.filterIsDisable) {
        const FILTER = audioContext.createBiquadFilter();
        const filterTypes = filterLimits.TYPES;
        //set the array "filter.types" with the true effects
        let n = 0;
        for (let i = 0; i < filterTypes.length; i += 1) {
            if (!globalState.filter[filterTypes[i]]) {
                globalState.filter.types[n] = filterTypes[i];
                n += 1;
            }
        }

        FILTER.channelCountMode = "max";
        FILTER.channelInterpretation = "speakers";
        FILTER.detune.value = 0;
        FILTER.gain.value = 1;
        FILTER.frequency.value = rToFrequency(
            random(globalState.filter.frequencyMin, globalState.filter.frequencyMax)
        );
        FILTER.type = (
            n === 1
            ? globalState.filter.types[0]
            : globalState.filter.types[random(0, n - 1)]
        );
        FILTER.Q.value = (
            FILTER.type !== "lowpass" && FILTER.type !== "highpass"
            ? rToQ(random(globalState.filter.qMin, globalState.filter.qMax))
            : 1
        );
        prev.connect(FILTER);
        prev = FILTER; //input is a FilterNode
    }
    //DELAY
    if (flipCoin() && !audioState.delayIsDisable) {
        const DELAY = audioContext.createDelay(rToTime(delayLimits.TIME_MAX));
        const feedback = audioContext.createGain();
        const gain = audioContext.createGain();

        DELAY.channelCountMode = "max";
        DELAY.channelInterpretation = "speakers";
        DELAY.delayTime.value = rToTime(
            random(globalState.delay.timeMin, globalState.delay.timeMax)
        );
        feedback.gain.value =  rToFeedback(
            random(globalState.delay.feedbackMin, globalState.delay.feedbackMax)
        );

        DELAY.connect(feedback);
        feedback.connect(DELAY);
        prev.connect(DELAY);
        prev.connect(gain);
        feedback.connect(gain);

        prev = gain; //input is a GainNode
    }

    prev.connect(outputGain);


    prev.connect(outputGain);

    audioState.source.connect(inputGain);
    outputGain.connect(audioContext.destination);

    audioState.outputGain = outputGain;
    return;
}

/**
@type {(audioState: AudioState) => Promise | Panic} */
function fadeOut(audioState) {
    if (globalState.audioContext === undefined) {
        throw new Error("PANIC!!! The audio context disapears. We can not run the app.");
    }
    const fadeTime = rToFade(globalState.fadeOut);
    if (audioState.outputGain !== undefined) {
        audioState.outputGain.gain.linearRampToValueAtTime(
            GAIN_0,
            globalState.audioContext.currentTime + (fadeTime / 1000)
        );
    } else {
        console.warn(
            "Warning: For some reason the Audio", audioState.id,"have a undefined outputGain.",
            "Cause of that, the app can not do a fadeOut."
        );
    }
    return wait(fadeTime + 50);
}

/**
@type {(audioState: AudioState) => Panic | undefined} */
function fadeIn(audioState) {
    if (globalState.audioContext === undefined) {
        throw new Error("PANIC!!! The audio context disapears. We can not run the app.");
    }
    const fadeTime = rToFade(globalState.fadeIn);
    if (audioState.outputGain !== undefined) {
        audioState.outputGain.gain.exponentialRampToValueAtTime(
            audioState.volume,
            globalState.audioContext.currentTime + (fadeTime / 1000)
        );
    } else {
        console.warn(
            "Warning: For some reason the Audio", audioState.id,"have a undefined outputGain.",
            "Cause of that, the app can not do a fadeIn."
        );
    }
    return;
}


/**
@type {(audioState: AudioState, callDispatch: boolean) => Promise<boolean>} */
async function _stop(audioState, callDispatch) {
    if (audioState !== undefined && audioState.isPlaying) {
    //FADEOUT THE AUDIO
        await fadeOut(audioState); //CAN PANIC
        audioState.audioEngine.ontimeupdate = null;
        if (callDispatch) {
            audioState?.dispatch(audioActions.stop);
        }

        if (!audioState.isPlaying) {
            return false;
        }

        if (!audioState.audioEngine.paused) {
            audioState.audioEngine.pause();
        }
        if (audioState.outputGain !== undefined) {
            audioState.outputGain.disconnect();
        }
        audioState.outputGain = undefined;
        if (audioState.source !== undefined) {
            audioState.source.disconnect();
        }
        audioState.isPlaying = false;
        return true;
    } else {
        return false;
    }
}

/**
@type {(audioState: AudioState) => Promise<boolean>}*/
async function _play(audioState) {
    if (audioState !== undefined) {
    //Set RandomPoints
        let rsp = audioState.startTime;
        let rep = audioState.endTime;

        if (audioState.duration >= 1) {
            let interval = 0.5; //500 miliseconds
            if (!audioState.randomStartPointIsDisable
                && !audioState.randomEndPointIsDisable
            ) {
                //create interval
                const d = Math.round(audioState.duration * 10);
                const p = Math.round((rep - rsp) * 10);
                const min = 5; //500 miliseconds;
                const max = (p < 5 ? min : p > d ? d : p);
                interval = random(min, max) / 10;
            }
            if (!audioState.randomStartPointIsDisable) {
                rsp = random(audioState.startTime * 10, (rep - interval) * 10) / 10;
            }
            if (!audioState.randomEndPointIsDisable) {
                rep = random((rsp + interval) * 10, audioState.endTime * 10) / 10;
            }
        }
        audioState?.dispatch(audioActions.changePoints(audioState, rsp, rep));

    //Set Audio Configuration
        //PLAYBACK RATE
        if (!audioState.playbackRateIsDisable) {
            const value = rToPlaybackRate(random(globalState.playbackRate.min, globalState.playbackRate.max));
            audioState.playbackRate = value;
            audioState.audioEngine.playbackRate = value;
        } else {
            audioState.playbackRate = 1;
            audioState.audioEngine.playbackRate = 1;
        }

        //CONNECTIONS
        createAudioRandomChain(audioState);

    //Set currentTime
        audioState.audioEngine.currentTime = audioState.startPoint;

    //Calculate the End
        /**
        @type {<T extends HTMLAudioElement>(this:T , e: Event) => any} */
        audioState.audioEngine.ontimeupdate = function () {
            audioState?.dispatch(
                audioActions.changeCurrentTime(audioState, this.currentTime)
            );
            if (this.currentTime >= audioState.endPoint) {
                audioState?.dispatch(audioActions.colorToDefault);
                _stop(audioState, true);
            }
        };

    //Play AudioEngine
        //audioState.outputGain.gain.value = 1;
        await audioState.audioEngine.play();

        audioState.isPlaying = true;
        fadeIn(audioState); //CAN PANIC
        audioState?.dispatch(audioActions.play);
        return true;
    } else {
        return false;
    }
}
export {
    _play,
    _stop
};