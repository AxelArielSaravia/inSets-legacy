import {
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
} from "./configurations.js";

import globalState from "../state/globalState.js";

import {rToFade} from "./maps.js";
import {flipCoin, wait} from "./utils.js";
import {random} from "../utils.js";

import {audioActions} from "../slices/audio.js";

const GAIN_0 = 0.0001;

/*-
createAudioRandomChain :: (AudioContext, AudioState) -> [GainNode, GainNode] */
function createAudioRandomChain(audioCtx, audioState) {
    //The variable that we use for the connections chain
    let prev;

    //main gains
    const inputGain = audioCtx.createGain();
    const outputGain = audioCtx.createGain();

    //atenuate the general volume
    inputGain.gain.value = 0.8;

    //set min gain value to create a fadeIn later
    outputGain.gain.value = GAIN_0;

    prev = inputGain; //our input is the GainNode
    //PANNER
    if (!audioState.pannerIsDisable) {
        const audioPannerConfig = createAudioPannerConfiguration(globalState.panner);
        const PANNER = audioCtx.createPanner();
        PANNER.coneInnerAngle = audioPannerConfig.coneInnerAngle;
        PANNER.coneOuterAngle = audioPannerConfig.coneOuterAngle;
        PANNER.coneOuterGain = audioPannerConfig.coneOuterGain;
        PANNER.distanceModel = audioPannerConfig.distanceModel;
        PANNER.maxDistance = audioPannerConfig.maxDistance;
        PANNER.orientationX.value = audioPannerConfig.orientationX;
        PANNER.orientationY.value = audioPannerConfig.orientationY;
        PANNER.orientationZ.value = audioPannerConfig.orientationZ;
        PANNER.panningModel = audioPannerConfig.panningModel;
        PANNER.positionX.value = audioPannerConfig.positionX;
        PANNER.positionY.value = audioPannerConfig.positionY;
        PANNER.positionZ.value = audioPannerConfig.positionZ;
        PANNER.refDistance = audioPannerConfig.refDistance;
        prev.connect(PANNER); //input is PannerNode
        prev = PANNER;
    }
    //FILTER
    if (flipCoin() && !audioState.filterIsDisable) {
        const audioFilterConfig = createAudioFilterConfiguration(globalState.filter);
        const FILTER = audioCtx.createBiquadFilter();
        FILTER.channelCountMode = audioFilterConfig.channelCountMode;
        FILTER.channelInterpretation = audioFilterConfig.channelInterpretation;
        FILTER.detune.value = audioFilterConfig.detune;
        FILTER.gain.value = audioFilterConfig.gain;
        FILTER.frequency.value = audioFilterConfig.frequency;
        FILTER.Q.value = audioFilterConfig.q;
        FILTER.type = audioFilterConfig.type;
        prev.connect(FILTER);
        prev = FILTER; //input is a FilterNode
    }
    //DELAY
    if (flipCoin() && !audioState.delayIsDisable) {
        const audioDelayConfig = createAudioDelayConfiguration(globalState.delay);
        const DELAY = audioCtx.createDelay(audioDelayConfig.maxDelayTime);
        const feedback = audioCtx.createGain();
        const gain = audioCtx.createGain();
        DELAY.channelCountMode = audioDelayConfig.channelCountMode;
        DELAY.channelInterpretation = audioDelayConfig.channelInterpretation;
        DELAY.delayTime.value = audioDelayConfig.delayTime;
        feedback.gain.value = audioDelayConfig.feedback;

        DELAY.connect(feedback);
        feedback.connect(DELAY);
        prev.connect(DELAY);
        prev.connect(gain);
        feedback.connect(gain);

        prev = gain; //input is a GainNode
    }

    prev.connect(outputGain);


    return {
        inputGain,
        outputGain
    };
}

/*-
fadeOut :: AudioState -> Promise */
function fadeOut(audioState) {
    const fadeTime = rToFade(globalState.fadeOut);
    audioState.outputGain.gain.linearRampToValueAtTime(
        GAIN_0,
        globalState.audioContext.currentTime + (fadeTime / 1000)
    );
    return wait(fadeTime + 50);
}

/*-
fadeIn :: AudioState -> undefined */
function fadeIn(audioState) {
    const fadeTime = rToFade(globalState.fadeIn);
    audioState.outputGain.gain.exponentialRampToValueAtTime(
        audioState.volume,
        globalState.audioContext.currentTime + (fadeTime / 1000)
    );
}

/*-
_stop :: (AudioState, auidioDispatcher) -> Promise<boolean> */
function _stop(audioState, audioDispatcher) {
    return (
        audioState !== undefined && audioState.isPlaying
        ? (
//FADEOUT THE AUDIO
            fadeOut(audioState).then(
                function () {
                    if (typeof audioDispatcher === "function") {
                        return audioDispatcher(audioActions.stop);
                    }
                }
            ).then(
//DISCONNECT AUDIO
                function () {
                    if (audioState === undefined || !audioState.isPlaying) {
                        return false;
                    }
                    if (audioState.audioEngine !== undefined
                        && !audioState.audioEngine.paused
                    ) {
                        audioState.audioEngine.pause();
                    }
                    audioState.audioEngine.ontimeupdate = undefined;
                    if (audioState.outputGain !== undefined) {
                        audioState.outputGain.disconnect();
                    }
                    audioState.outputGain = undefined;
                    if (audioState.source !== undefined) {
                        audioState.source.disconnect();
                    }
                    audioState.isPlaying = false;
                    return true;
                }
            )
        )
        : new Promise(function (res) { res(false); })
    );
}

/*-
_play :: (AudioState, audioDispatcher) -> Promise<boolean> */
function _play(audioState, audioDispatcher) {
    if (audioState !== undefined) {
//Set RandomPoints
        {
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
            audioDispatcher(audioActions.changePoints(audioState, rsp, rep));
        }

//Set Audio Configuration
        {
            //PLAYBACK RATE
            if (!audioState.playbackRateIsDisable) {
                const value = createAudioPlayBackRateConfiguration(globalState.playbackRate);
                audioState.playbackRate = value;
                audioState.audioEngine.playbackRate = value;
            } else {
                audioState.playbackRate = 1;
                audioState.audioEngine.playbackRate = 1;
            }

            //CONNECTIONS
            const {inputGain, outputGain} = createAudioRandomChain(
                globalState.audioContext,
                audioState
            );

            audioState.source.connect(inputGain);
            outputGain.connect(globalState.audioContext.destination);

            audioState.outputGain = outputGain;
        }


//Set currentTime
        audioState.audioEngine.currentTime = audioState.startPoint;

//Calculate the End
        audioState.audioEngine.ontimeupdate = function (e) {
            audioDispatcher(
                audioActions.changeCurrentTime(audioState, e.target.currentTime)
            );
            if (e.target.currentTime >= audioState.endPoint) {
                audioDispatcher(audioActions.colorToDefault);
                _stop(audioState, audioDispatcher);
            }
        };

//Play AudioEngine
        //audioState.outputGain.gain.value = 1;
        return new Promise(
            function (res) {
                res(audioState.audioEngine.play());
            }
        ).then(
            function () {
                audioState.isPlaying = true;
                fadeIn(audioState);
                return audioDispatcher(audioActions.play);
            }
        ).then(
            function () {
                return true;
            }
        );
    }
    return new Promise(function (res) { res(false); });
}

export {
    _play,
    _stop
};