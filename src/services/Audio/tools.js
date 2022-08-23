import {     
    createAudioDelayConfiguration,
    createAudioFilterConfiguration,
    createAudioPannerConfiguration,
    createAudioPlayBackRateConfiguration
} from "./configurations.js"
import { random } from "../utils.js";

import { GlobalState } from "../../state/Global/index.js";
import createId from "../Id/index.js";

/**
 * @returns {string}
 */
const changeColor = () => `rgb(${random(32, 141)},${random(32, 141)},${random(32, 141)})`;

const randomDecide = () => !!random(0,1);

/**
 * @param {number} ms 
 * @returns {Promise<number>}
 */
const wait = ms => new Promise(resolve => setInterval(resolve, ms));

/* -------------------------------------------------------------------------- */
/*                                Create Nodes                                */
/* -------------------------------------------------------------------------- */

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioDelay} audioDelayConfig 
 * @returns {GainNode}
 */
const createDelay = (audioCtx, audioDelayConfig) => {
    const DELAY = audioCtx.createDelay(audioDelayConfig.maxDelayTime);
    DELAY.channelCountMode = audioDelayConfig.channelCountMode;
    DELAY.channelInterpretation = audioDelayConfig.channelInterpretation;
    DELAY.delayTime.value = audioDelayConfig.delayTime;

    const feedback = audioCtx.createGain();
    feedback.gain.value = audioDelayConfig.feedback;

    feedback.connect(DELAY);
    DELAY.connect(feedback);

    return feedback 
}

/**
 * @param {AudioContex} audioCtx 
 * @param {AudioFilter} audioFilterConfig 
 * @returns {BiquadFilterNode}
 */
 const createFilter = (audioCtx, audioFilterConfig) => {
    const FILTER = audioCtx.createBiquadFilter();
    FILTER.channelCountMode = audioFilterConfig.channelCountMode;
    FILTER.channelInterpretation = audioFilterConfig.channelInterpretation;
    FILTER.detune.value = audioFilterConfig.detune;
    FILTER.gain.value = audioFilterConfig.gain;
    FILTER.frequency.value = audioFilterConfig.frequency;
    FILTER.Q.value = audioFilterConfig.q; 
    FILTER.type = audioFilterConfig.type;
    return FILTER;
}

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioPanner} audioPanner 
 * @returns {PannerNode}
 */
const createPanner = async (audioCtx, audioPannerConfig) => {
    const PANNER = await audioCtx.createPanner();
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
    return PANNER;
}

/* -------------------------------------------------------------------------- */
/*                               Set Audio                                    */
/* -------------------------------------------------------------------------- */

/**
 * @param {AudioContext} audioCtx 
 * @param {AudioState} audioState 
 * @returns {[GainNode, GainNode]}
 */
const createAudioRandomChain = async (audioCtx, audioState) => {
    const inputGain = await audioCtx.createGain();
    const outputGain = await audioCtx.createGain();
    
    //set min gain value to create a fadeIn later
    outputGain.gain.value = 0.01;

    let input = inputGain;

    //PANNER
    if (!audioState.pannerIsDisable) {
        const audioPannerConfig = createAudioPannerConfiguration(GlobalState.panner);
        const PANNER = await createPanner(audioCtx, audioPannerConfig);
        await input.connect(PANNER);
        input = PANNER; 
    }
    //FILTER
    if (randomDecide() && !audioState.filterIsDisable) {
        const audioFilterConfig =  createAudioFilterConfiguration(GlobalState.filter);
        const FILTER =  createFilter(audioCtx, audioFilterConfig);
        await input.connect(FILTER)
        input = FILTER;  
    }
    //DELAY
    if (randomDecide() && !audioState.delayIsDisable) {
        const audioDelayConfig = createAudioDelayConfiguration(GlobalState.delay)
        const feedback = createDelay(audioCtx, audioDelayConfig);
        await input.connect(feedback);
        input = feedback;
    }

    await input.connect(outputGain);
    return [inputGain, outputGain];
}

/**
 * @param {AudioState} audioState 
 * @param {number} value
 */
 const changePlayBackRate = (audioState, value) => {
    audioState.playBackRate = value;
    if (GlobalState.ENGINE_TYPE === "audioNode") {
        audioState.audioEngine.playbackRate = value;
    } else if (GlobalState.ENGINE_TYPE  === "audioBuffer") {
        audioState.source.playbackRate.value = value;
    }
}


const setAudioConfiguration = async (AUDIO_STATE) => {
    if (GlobalState.ENGINE_TYPE === "audioBuffer") {
        AUDIO_STATE.source = await GlobalState.AUDIO_CONTEXT.createBufferSource();
        AUDIO_STATE.source.buffer = await AUDIO_STATE.audioEngine;
    }
    
    //PLAYBACK RATE
    if (!AUDIO_STATE.playBackRateIsDisable) {
        const playBackRateNewVal = createAudioPlayBackRateConfiguration(GlobalState.playBackRate);
        changePlayBackRate(AUDIO_STATE, playBackRateNewVal);
    }
    
    //CONNECTIONS
    const [input, output] = await createAudioRandomChain(GlobalState.AUDIO_CONTEXT, AUDIO_STATE);

    await AUDIO_STATE.source.connect(input);
    await output.connect(GlobalState.AUDIO_CONTEXT.destination);

    AUDIO_STATE.outputGain = output;
}

/* -------------------------------------------------------------------------- */
/*                         Audio Interaction Functions                        */
/* -------------------------------------------------------------------------- */

/**
 * @param {AudioState} AUDIO_STATE 
 * @returns {Promise <number>}
 */
const fadeOut = (AUDIO_STATE) => {
    const fadeTime = GlobalState.fadeOut;
    AUDIO_STATE.outputGain.gain.exponentialRampToValueAtTime(0.01, GlobalState.AUDIO_CONTEXT.currentTime + fadeTime / 1000);
    return wait(fadeTime);
}


const fadeIn = (AUDIO_STATE) => {
    const fadeTime = GlobalState.fadeIn;
    AUDIO_STATE.outputGain.gain.exponentialRampToValueAtTime(AUDIO_STATE.volume, GlobalState.AUDIO_CONTEXT.currentTime + fadeTime / 1000);
}

/**
 * @param {AudioState} AUDIO_STATE 
 */
const play_ENGINE_audioNode = (AUDIO_STATE) => {
    AUDIO_STATE.audioEngine.currentTime = AUDIO_STATE.startPoint;
    AUDIO_STATE.audioEngine.play();
}

const calculateEnd_ENGINE_audioNode = (AUDIO_STATE, audioDispatcher) => {
    AUDIO_STATE.audioEngine.ontimeupdate = function(e) {
        if (e.target.currentTime >= AUDIO_STATE.endTime) {
            return stop(AUDIO_STATE._ID, audioDispatcher);
        }
    }
}

/**
 * @param {AudioState} AUDIO_STATE 
 */
const play_ENGINE_audioBuffer = (AUDIO_STATE) => {
    AUDIO_STATE.source.start(0, AUDIO_STATE.startPoint);
}

const calculateEnd_ENGINE_audioBuffer = (AUDIO_STATE, audioDispatcher) => {
    AUDIO_STATE.change_START_ID();
    const START_ID =  AUDIO_STATE._START_ID;
    const END_TIME = Math.floor((AUDIO_STATE.endTime - AUDIO_STATE.startPoint) * 1000 / AUDIO_STATE.playBackRate);
    wait(Math.floor(END_TIME))
    .then(() => {
        if (AUDIO_STATE._START_ID === START_ID && AUDIO_STATE.isPlaying) {
            return stop(AUDIO_STATE._ID, audioDispatcher);
        }
    });  
}

const disconnect = (audioState) => {
    if (audioState && audioState.isPlaying) {
        if (GlobalState.ENGINE_TYPE === "audioNode") {
            if (audioState.audioEngine && !audioState.audioEngine.paused) audioState.audioEngine.pause();
            audioState.audioEngine.ontimeupdate = null;
        } else {
            if (audioState.source) audioState.source.stop();
        }
        if (audioState.source) audioState.source.disconnect();
        if (audioState.outputGain) audioState.outputGain.disconnect();
        //set source to null
        if (GlobalState.ENGINE_TYPE === "audioBuffer") {
            audioState.source = null;
        }
        audioState.outputGain = null;

        return true;
    }
    return false;
}

const stop = async (id, audioDispatcher = null) => {
    const AUDIO_STATE = GlobalState.AUDIO_LIST.get(id);
    if (AUDIO_STATE && AUDIO_STATE.isPlaying) {
        await fadeOut(AUDIO_STATE);
        disconnect(AUDIO_STATE);

        if (typeof audioDispatcher === "function") {
            audioDispatcher({
                id: id,
                type: "stop"
            });
        }
        return true;
    }
    return false;
}

const setRandomStartPoint = (AUDIO_STATE, audioDispatcher) => {
    if (!AUDIO_STATE.randomStartPointIsDisable) {
        if (AUDIO_STATE.endTime - AUDIO_STATE.startTime >= 2) {
            const value = random((AUDIO_STATE.startTime * 1000), (AUDIO_STATE.endTime * 1000) - 400) / 1000;
            AUDIO_STATE.startPoint = value;
            audioDispatcher({
                id: AUDIO_STATE._ID,
                variable: "randomStartPoint", 
                type: "random",
                value: value
            });
        }
    } else {
        AUDIO_STATE.startPoint = AUDIO_STATE.startTime;
        audioDispatcher({
            id: AUDIO_STATE._ID,
            variable: "randomStartPoint", 
            type: "random",
            value: AUDIO_STATE.startTime
        });
    }
}

const play = async (id, audioDispatcher) => {
    const AUDIO_STATE = GlobalState.AUDIO_LIST.get(id);
    if (AUDIO_STATE != null) {
        
        setRandomStartPoint(AUDIO_STATE, audioDispatcher);

        await setAudioConfiguration(AUDIO_STATE);

        fadeIn(AUDIO_STATE);
        
        if (GlobalState.ENGINE_TYPE === "audioNode") {
            play_ENGINE_audioNode(AUDIO_STATE);
            calculateEnd_ENGINE_audioNode(AUDIO_STATE, audioDispatcher);

        } else if (GlobalState.ENGINE_TYPE === "audioBuffer") {
            play_ENGINE_audioBuffer(AUDIO_STATE);
            calculateEnd_ENGINE_audioBuffer(AUDIO_STATE, audioDispatcher);
        }
        await audioDispatcher({id: id, type: "play"});
        
        return true;
    }
    return false;
}

const setAudioVolume = (id) => {
    const AUDIO_STATE = GlobalState.AUDIO_LIST.get(id);
    if (AUDIO_STATE) {
        if (AUDIO_STATE.isPlaying) {
            AUDIO_STATE.outputGain.gain.value = AUDIO_STATE.volume
        }
    }
}

const deleteAudio = async (id, globalDispatcher, audioDispatcher) => {
    await stop(id, audioDispatcher)
    await globalDispatcher({type: "DELETE_Audio", id: id});
}

const deleteAll = async (globalDispatcher) => {
    const AUDIO_STATE = GlobalState.AUDIO_LIST;
    for (const id of AUDIO_STATE.keys()) {
        await stop(id)
    }
    await globalDispatcher({type: "CLEAR_Audio"});
}

/* -------------------------------------------------------------------------- */
/*                            Generattive Algoritms                           */
/* -------------------------------------------------------------------------- */

function binarySearch(arr, target) {
    let startI = 0;
    let endI = arr.length-1;
    
    while (startI <= endI) {
        const midI = Math.floor((startI + endI) / 2);
      
        if (arr[midI][1] < target) {
            startI = midI + 1
        } else {
            if (!arr[midI-1] || arr[midI-1][1] < target) {
                return arr[midI][0];
            } else { 
                endI = midI - 1;
            }
        }
    }
    //if the target did not found 
    return 0;
}

const calculateTheLenghtOfSetExecution = () => {
    let sum = 0;
    const arrOfSums = [];
    const arrOfValues = GlobalState.probabilityOfSetSize;
    arrOfValues.forEach((v,i) => {
        if (v > 0) {
            sum += v;
            arrOfSums.push([i, sum]);
        }
    });
    const n = random(1, sum);
    return binarySearch(arrOfSums, n);
   /*  
    for (let i = 0; i < arrOfSums.length; i++) {
        if (n <= arrOfSums[i][1]) return arrOfSums[i][0]
    } 
    return 0;
    */
}

const AudioProbabilityArray = (AUDIO_LIST) => {
    let arrOfAudioProbabilities = [];
    AUDIO_LIST.forEach((element, key) => {
        const v = element.probability;
        const arr = (new Array(v)).fill(key);
        arrOfAudioProbabilities = arrOfAudioProbabilities.concat(arr);
    });
    return arrOfAudioProbabilities
}

const createNewSetExecution = () => {
    const AUDIO_LIST = GlobalState.AUDIO_LIST;
    //select set size
    const n = calculateTheLenghtOfSetExecution();
    console.log("set execution size: ",n);//DEBUGGER

    /**@type {string[]}*/
    let executeSet = [];
    //selects elements for the set
    let possibleAudios = AudioProbabilityArray(AUDIO_LIST);
    if (AUDIO_LIST.size / 2 >= n) {
        while (executeSet.length < n) {
            const _KEY = possibleAudios[random(0, possibleAudios.length-1)];
            executeSet.push(_KEY);
            possibleAudios = possibleAudios.filter(key => key !== _KEY);
        }
    } else {
        for (let total = AUDIO_LIST.size - n; total > 0; total--) {
            const _KEY = possibleAudios[random(0, possibleAudios.length-1)];
            possibleAudios = possibleAudios.filter(key => key !== _KEY);
        }
        executeSet = [...(new Set(possibleAudios))];
    }
    //console.log("executeSet", executeSet);//DEBUGGER
    return executeSet;
}


const randomSetsExecution = (audioDispatcher) => {
    const executeSet = createNewSetExecution();
    if (executeSet.length > 0) {
        //create new color;
        const newColor = changeColor();
        
        executeSet.forEach(_ID => {
            const AUDIO_STATE = GlobalState.AUDIO_LIST.get(_ID);
            if (AUDIO_STATE.isPlaying) {
                Promise.resolve()
                .then(() => stop(_ID, audioDispatcher))
                .then((bool) => {
                    if (bool && GlobalState.IS_STARTED) {
                        audioDispatcher({
                            id:_ID, 
                            variable: "color", 
                            type: "change", 
                            value: newColor
                        });
                        return play(_ID, audioDispatcher);
                    }
                })
                .catch(err => console.error(err));
            } else {
                wait(GlobalState.fadeOut)
                .then(() => {
                    if (GlobalState.IS_STARTED) {
                        audioDispatcher({
                            id:_ID, 
                            variable: "color", 
                            type: "change", 
                            value: newColor
                        });
                        return play(_ID, audioDispatcher);
                    }
                })
                .catch(err => console.error(err));
            }
        });
    }
}

const randomTimeExecution = (audioDispatcher, STARTED_ID) => {
    if (GlobalState.IS_STARTED && GlobalState.STARTED_ID === STARTED_ID) {
        randomSetsExecution(audioDispatcher);
        const n = random(GlobalState.timeInterval.min, GlobalState.timeInterval.max);
        console.log("next execution: ", n + " ms");//DEBUGGER
        wait(n).then(() => randomTimeExecution(audioDispatcher, STARTED_ID));
    } else {
        console.log("END"); 
    }
}

const startApp = async (globalDispatcher, audioDispatcher) => {
    GlobalState.STARTED_ID = createId();
    await globalDispatcher({type: "start"});
    randomTimeExecution(audioDispatcher, GlobalState.STARTED_ID);
}

const stopApp = async (globalDispatcher, audioDispatcher) => {
   await globalDispatcher({type: "stop"});
    GlobalState.AUDIO_LIST.forEach(({isPlaying}, key) => {
        if (isPlaying) {
            stop(key, audioDispatcher);
        }
    });
}

export {
    play,
    stop,
    setAudioVolume,
    deleteAudio,
    deleteAll,
    startApp,
    stopApp
}